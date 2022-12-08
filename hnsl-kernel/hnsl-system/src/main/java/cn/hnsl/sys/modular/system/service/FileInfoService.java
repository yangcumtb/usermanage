package cn.hnsl.sys.modular.system.service;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.model.exception.enums.CoreExceptionEnum;
import cn.hnsl.sys.core.async.AsyncTask;
import cn.hnsl.sys.core.constant.DefaultAvatar;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.modular.enmus.FileInfoBunessEnum;
import cn.hnsl.sys.modular.system.entity.FileInfo;
import cn.hnsl.sys.modular.system.entity.SysFileInfoInterim;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.mapper.FileInfoMapper;
import cn.hnsl.sys.modular.system.model.UploadResult;
import cn.hnsl.sys.modular.system.service.impl.SysUserServiceImpl;
import cn.hutool.core.codec.Base64;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * <p>
 * 文件信息表
 * 服务实现类
 * </p>
 *
 * @author spot
 * @since 2018-12-07
 */
@Service
@Slf4j
public class FileInfoService extends ServiceImpl<FileInfoMapper, FileInfo> {

    @Resource
    private SysUserServiceImpl userService;

    @Resource
    private AsyncTask asyncTask;

    @Resource
    private FileInfoInterimService fileInfoInterimService;

    /**
     * 更新头像
     *
     * @author fengshuonan
     * @Date 2018/11/10 4:10 PM
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateAvatar(String fileId) {
        LoginUser currentUser = LoginContextHolder.me().getLoginUser();
        if (currentUser == null) {
            throw new ServiceException(CoreExceptionEnum.NO_CURRENT_USER);
        }

        SysUser sysUser = userService.getById(currentUser.getId());

        //更新用户的头像
        sysUser.setAvatar(fileId);
        userService.updateById(sysUser);
    }

    /**
     * 预览当前用户头像
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:04
     */
    public byte[] previewAvatar() {

        LoginUser currentUser = LoginContextHolder.me().getLoginUser();
        if (currentUser == null) {
            throw new ServiceException(CoreExceptionEnum.NO_CURRENT_USER);
        }

        //获取当前用户的头像id
        SysUser sysUser = userService.getById(currentUser.getId());
        String avatar = sysUser.getAvatar();

        //如果头像id为空就返回默认的
        if (ToolUtil.isEmpty(avatar)) {
            return Base64.decode(DefaultAvatar.BASE_64_AVATAR);
        } else {

            //文件id不为空就查询文件记录
            FileInfo fileInfo = this.getById(avatar);
            if (fileInfo == null) {
                return Base64.decode(DefaultAvatar.BASE_64_AVATAR);
            } else {
                try {
                    String filePath = fileInfo.getFilePath() + fileInfo.getFileId() + "." + fileInfo.getFileSuffix();
                    return IoUtil.readBytes(new FileInputStream(filePath));
                } catch (FileNotFoundException e) {
                    return Base64.decode(DefaultAvatar.BASE_64_AVATAR);
                }
            }
        }

    }

    /**
     * 上传文件
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public String uploadImg(MultipartFile file, FileInfo fileInfoTemp) {
        //生成文件的唯一id
        String fileId = IdWorker.getIdStr();


        //获取文件后缀
        String fileSuffix = ToolUtil.getFileSuffix(file.getOriginalFilename());

        //获取文件原始名称
        String originalFilename = file.getOriginalFilename();

        //生成文件的最终名称
        String finalName = fileId + "." + ToolUtil.getFileSuffix(originalFilename);

        try {
            //保存文件到指定目录
            String fileSavePath = ConstantsContext.getFileUploadPath() + "/img";
            //按日期存放
            String subPath = new SimpleDateFormat("/yyyy/MM/dd/").format(new Date());
            fileSavePath = fileSavePath + subPath;
            // 如果文件夹不存在，就创建
            File dir = new File(fileSavePath);
            if (!dir.exists()) {
                // 递归地创建不存在的文件夹
                dir.mkdirs();
            }

            File newFile = new File(dir.getAbsolutePath() + File.separator + finalName);
            file.transferTo(newFile);


            //保存文件信息
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileName(originalFilename);
            fileInfo.setAssociateId(fileInfoTemp.getAssociateId());
            fileInfo.setFileSuffix(fileSuffix);
            /*如果上传的是图斑影像图，则用图斑名称当做文件ID*/
            if (Integer.valueOf(fileInfoTemp.getFileBusinessType()).equals(FileInfoBunessEnum.TBYX.getBuniesstype())) {
                fileId = originalFilename.replace("." + fileSuffix, "");
                fileInfo.setFileYear(Integer.valueOf(fileId.substring(fileId.length() - 4)));
            }
            fileInfo.setFileId(fileId);
            fileInfo.setFilePath(fileSavePath);
            fileInfo.setFileBusinessName(fileInfoTemp.getFileBusinessName());
            fileInfo.setFileBusinessType(fileInfoTemp.getFileBusinessType());
            fileInfo.setFinalName(fileId + "." + ToolUtil.getFileSuffix(originalFilename));

            //判断是否为图片
            asyncTask.compressImg(newFile, fileId, ToolUtil.getFileSuffix(originalFilename), fileSavePath);

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfo.setFileSizeKb(kb);
            this.saveOrUpdate(fileInfo);
        } catch (Exception e) {
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return fileId;

    }

    /**
     * 上传文件
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public String uploadImg(MultipartFile file, FileInfo fileInfoTemp, String assosicateid) {

        if ("".equals(assosicateid)) {
            //批量上传需要走这个方法
            assosicateid = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('-'));
        }
        //生成文件的唯一id
        String fileId = IdWorker.getIdStr();

        fileInfoTemp.setAssociateId(assosicateid);
        //获取文件后缀
        String fileSuffix = ToolUtil.getFileSuffix(file.getOriginalFilename());

        //获取文件原始名称
        String originalFilename = file.getOriginalFilename();

        //生成文件的最终名称
        String finalName = fileId + "." + ToolUtil.getFileSuffix(originalFilename);

        try {
            //保存文件到指定目录
            String fileSavePath = ConstantsContext.getFileUploadPath() + "/img";
            //按日期存放
            String subPath = new SimpleDateFormat("/yyyy/MM/dd/").format(new Date());
            fileSavePath = fileSavePath + subPath;
            // 如果文件夹不存在，就创建
            File dir = new File(fileSavePath);
            if (!dir.exists()) {
                // 递归地创建不存在的文件夹
                dir.mkdirs();
            }

            File newFile = new File(dir.getAbsolutePath() + File.separator + finalName);
            file.transferTo(newFile);


            //保存文件信息
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileName(originalFilename);
            fileInfo.setAssociateId(assosicateid);
            fileInfo.setFileSuffix(fileSuffix);
            /*如果上传的是图斑影像图，则用图斑名称当做文件ID*/
            if (Integer.valueOf(fileInfoTemp.getFileBusinessType()).equals(FileInfoBunessEnum.TBYX.getBuniesstype())) {
                fileId = originalFilename.replace("." + fileSuffix, "");
                fileInfo.setFileYear(Integer.valueOf(fileId.substring(fileId.length() - 4)));
            }
            fileInfo.setFileId(fileId);
            fileInfo.setFilePath(fileSavePath);
            fileInfo.setFileBusinessName(fileInfoTemp.getFileBusinessName());
            fileInfo.setFileBusinessType(fileInfoTemp.getFileBusinessType());
            fileInfo.setFinalName(fileId + "." + ToolUtil.getFileSuffix(originalFilename));

            //判断是否为图片
            asyncTask.compressImg(newFile, fileId, ToolUtil.getFileSuffix(originalFilename), fileSavePath);

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfo.setFileSizeKb(kb);
            this.saveOrUpdate(fileInfo);
        } catch (Exception e) {
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return assosicateid;

    }

    /**
     * 上传文件
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public String uploadImg(MultipartFile file) {

        //生成文件的唯一id
        String fileId = IdWorker.getIdStr();

        //获取文件后缀
        String fileSuffix = ToolUtil.getFileSuffix(file.getOriginalFilename());

        //获取文件原始名称
        String originalFilename = file.getOriginalFilename();

        //生成文件的最终名称
        String finalName = fileId + "." + ToolUtil.getFileSuffix(originalFilename);

        try {
            //保存文件到指定目录
            String fileSavePath = ConstantsContext.getFileUploadPath() + "/img";
            //按日期存放
            String subPath = new SimpleDateFormat("/yyyy/MM/dd/").format(new Date());
            fileSavePath = fileSavePath + subPath;
            // 如果文件夹不存在，就创建
            File dir = new File(fileSavePath);
            if (!dir.exists()) {
                // 递归地创建不存在的文件夹
                dir.mkdirs();
            }

            File newFile = new File(dir.getAbsolutePath() + File.separator + finalName);
            file.transferTo(newFile);
            //判断是否为图片
            asyncTask.compressImg(newFile, fileId, ToolUtil.getFileSuffix(originalFilename), fileSavePath);

            //保存文件信息
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileId(fileId);
            fileInfo.setFileName(originalFilename);
            fileInfo.setFileSuffix(fileSuffix);
            fileInfo.setFilePath(fileSavePath);
            fileInfo.setFinalName(fileId + "." + ToolUtil.getFileSuffix(originalFilename));

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfo.setFileSizeKb(kb);
            this.saveOrUpdate(fileInfo);
        } catch (Exception e) {
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return fileId;

    }

    /**
     * 上传文件
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public String uploadImgAO(MultipartFile file) {

        //生成文件的唯一id
        String fileId = IdWorker.getIdStr();

        //获取文件后缀
        String fileSuffix = ToolUtil.getFileSuffix(file.getOriginalFilename());

        //获取文件原始名称
        String originalFilename = file.getOriginalFilename();

        //生成文件的最终名称
        String finalName = fileId + "." + ToolUtil.getFileSuffix(originalFilename);

        try {
            //保存文件到指定目录
            String fileSavePath = ConstantsContext.getFileUploadPath() + "/img";
            //按日期存放
            String subPath = new SimpleDateFormat("/yyyy/MM/dd/").format(new Date());
            fileSavePath = fileSavePath + subPath;
            // 如果文件夹不存在，就创建
            File dir = new File(fileSavePath);
            if (!dir.exists()) {
                // 递归地创建不存在的文件夹
                dir.mkdirs();
            }

            File newFile = new File(dir.getAbsolutePath() + File.separator + finalName);
            file.transferTo(newFile);
            //判断是否为图片
            asyncTask.compressImg(newFile, fileId, ToolUtil.getFileSuffix(originalFilename), fileSavePath);

            //保存文件信息
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileId(fileId);
            fileInfo.setFileName(originalFilename);
            fileInfo.setFileSuffix(fileSuffix);
            fileInfo.setFilePath(fileSavePath);
            fileInfo.setFileBusinessName(FileInfoBunessEnum.YWHC.getBuniessName());
            fileInfo.setFileBusinessType(String.valueOf(FileInfoBunessEnum.YWHC.getBuniesstype()));
            fileInfo.setFinalName(fileId + "." + ToolUtil.getFileSuffix(originalFilename));

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfo.setFileSizeKb(kb);
            this.saveOrUpdate(fileInfo);
        } catch (Exception e) {
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return fileId;

    }


    public String uploadImgs(MultipartFile[] files) {
        String fileIds = "";
        for (MultipartFile f : files) {
            String fileId = this.uploadImg(f);
            fileIds = fileIds + fileId + ",";
        }
        return fileIds.substring(0, fileIds.length() - 1);

    }

    /**
     * 上传文件（默认上传路径）
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public UploadResult uploadFile(MultipartFile file) {
        String fileSavePath = ConstantsContext.getFileUploadPath();
        return this.uploadFile(file, fileSavePath);
    }

    /**
     * 上传文件（默认上传路径）
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public UploadResult uploadFile(MultipartFile file, FileInfo fileInfoTemp) {
        String fileSavePath = ConstantsContext.getFileUploadPath();
        return this.uploadFile(file, fileSavePath);
    }

    /**
     * 上传文件（指定上传路径）
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public UploadResult uploadFile(MultipartFile file, String fileSavePath) {

        UploadResult uploadResult = new UploadResult();

        //生成文件的唯一id
        String fileId = IdWorker.getIdStr();
        uploadResult.setFileId(fileId);

        //获取文件后缀
        String fileSuffix = ToolUtil.getFileSuffix(file.getOriginalFilename());
        uploadResult.setFileSuffix(fileSuffix);

        //获取文件原始名称
        String originalFilename = file.getOriginalFilename();
        uploadResult.setOriginalFilename(originalFilename);

        //生成文件的最终名称
        String finalName = fileId + "." + ToolUtil.getFileSuffix(originalFilename);
        uploadResult.setFinalName(finalName);
        uploadResult.setFileSavePath(fileSavePath + finalName);

        try {
            //保存文件到指定目录
            fileSavePath = fileSavePath + File.separator + "file";
            //按日期存放
            String subPath = new SimpleDateFormat("/yyyy/MM/dd/").format(new Date());
            fileSavePath = fileSavePath + subPath;
            // 如果文件夹不存在，就创建
            File dir = new File(fileSavePath);
            if (!dir.exists()) {
                // 递归地创建不存在的文件夹
                dir.mkdirs();
            }

            //保存文件到指定目录
            File newFile = new File(dir.getAbsolutePath() + File.separator + finalName);
            uploadResult.setFileSavePath(newFile.getAbsolutePath());
            //创建父目录
            FileUtil.mkParentDirs(newFile);

            //保存文件
            file.transferTo(newFile);

            //保存文件信息
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileId(fileId);
            fileInfo.setFileName(originalFilename);
            fileInfo.setFileSuffix(fileSuffix);
            fileInfo.setFilePath(fileSavePath);
            fileInfo.setFinalName(finalName);

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfo.setFileSizeKb(kb);
            this.save(fileInfo);
        } catch (Exception e) {
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return uploadResult;
    }


    /**
     * 上传文件（指定上传路径）和文件其他属性信息，一般指定文件的用途
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public UploadResult uploadFile(MultipartFile file, String fileSavePath, FileInfo fileInfoTemp) {

        UploadResult uploadResult = new UploadResult();

        //生成文件的唯一id
        String fileId = IdWorker.getIdStr();
        uploadResult.setFileId(fileId);

        //获取文件后缀
        String fileSuffix = ToolUtil.getFileSuffix(file.getOriginalFilename());
        uploadResult.setFileSuffix(fileSuffix);

        //获取文件原始名称
        String originalFilename = file.getOriginalFilename();
        uploadResult.setOriginalFilename(originalFilename);

        //生成文件的最终名称
        String finalName = fileId + "." + ToolUtil.getFileSuffix(originalFilename);
        uploadResult.setFinalName(finalName);
        uploadResult.setFileSavePath(fileSavePath + finalName);

        try {
            //保存文件到指定目录
            fileSavePath = fileSavePath + File.separator + "file";
            //按日期存放
            String subPath = new SimpleDateFormat("/yyyy/MM/dd/").format(new Date());
            fileSavePath = fileSavePath + subPath;
            // 如果文件夹不存在，就创建
            File dir = new File(fileSavePath);
            if (!dir.exists()) {
                // 递归地创建不存在的文件夹
                dir.mkdirs();
            }

            //保存文件到指定目录
            File newFile = new File(dir.getAbsolutePath() + File.separator + finalName);
            uploadResult.setFileSavePath(newFile.getAbsolutePath());
            //创建父目录
            FileUtil.mkParentDirs(newFile);

            //保存文件
            file.transferTo(newFile);

            //保存文件信息
            FileInfo fileInfo = new FileInfo();
            fileInfo.setFileId(fileId);
            fileInfo.setFileName(originalFilename);
            fileInfo.setFileSuffix(fileSuffix);
            fileInfo.setFilePath(fileSavePath);
            fileInfo.setFinalName(finalName);
            fileInfo.setFileBusinessName(fileInfoTemp.getFileBusinessName());
            fileInfo.setFileBusinessType(fileInfoTemp.getFileBusinessType());
            fileInfo.setAssociateId(fileInfoTemp.getAssociateId());

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfo.setFileSizeKb(kb);
            this.save(fileInfo);
        } catch (Exception e) {
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return uploadResult;
    }

    /**
     * 根据文件的最终命名获取文件信息
     *
     * @author fengshuonan
     * @Date 2020/1/1 16:48
     */
    public FileInfo getByFinalName(String finalName) {

        QueryWrapper<FileInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("final_name", finalName);

        return this.getOne(queryWrapper);
    }

    public byte[] previewImage(String pictureId, Boolean isThumb) {
        if (pictureId == null) {
            return Base64.decode(DefaultAvatar.BASE_64_IMG);
        }

        FileInfo fileInfo = this.getById(pictureId);

        if (fileInfo == null) {
            return Base64.decode(DefaultAvatar.BASE_64_IMG);
        } else {
            try {
                String thumb = "";
                if (isThumb) {
                    thumb = "_thumb";
                }
                String filePath = fileInfo.getFilePath() + fileInfo.getFileId() + thumb + "." + fileInfo.getFileSuffix();
                return IoUtil.readBytes(new FileInputStream(filePath));
            } catch (FileNotFoundException e) {
                return Base64.decode(DefaultAvatar.BASE_64_IMG);
            }
        }
    }

    public byte[] previewFile(String pictureId) {
        FileInfo fileInfo = this.getById(pictureId);
        try {
            String filePath = fileInfo.getFilePath() + fileInfo.getFinalName();
            return IoUtil.readBytes(new FileInputStream(filePath));
        } catch (FileNotFoundException e) {
            return Base64.decode(DefaultAvatar.BASE_64_IMG);
        }
    }

    /**
     * 使用关联id和业务类型来预览方案文件
     *
     * @param associateId
     * @param businessNo
     * @return
     */
    public byte[] previewFile(String associateId, String businessNo) {
        QueryWrapper condition = new QueryWrapper();
        condition.eq("associate_id", associateId);
        condition.eq("file_business_type", businessNo);
        List<FileInfo> fileInfos = this.getBaseMapper().selectList(condition);
        for (FileInfo fileInfo : fileInfos) {
            if (fileInfo.getFileBusinessType().equals(businessNo)) {
                String filePath = fileInfo.getFilePath() + fileInfo.getFinalName();
                try {
                    return IoUtil.readBytes(new FileInputStream(filePath));
                } catch (FileNotFoundException e) {
                    return Base64.decode(DefaultAvatar.BASE_64_IMG);
                }
            }
        }
        return Base64.decode(DefaultAvatar.BASE_64_IMG);
    }


    public List<FileInfo> getFileInfoList(String fileAssociationId) {
        List<FileInfo> fileInfoList = this.getBaseMapper().selectList(new LambdaQueryWrapper<FileInfo>().eq(FileInfo::getAvailable, 1).eq(FileInfo::getAssociateId, fileAssociationId));
        return fileInfoList;
    }


    public List<String> getFileInfoIdList(String fileAssociationId) {
        QueryWrapper<FileInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("file_id").eq("associate_id", fileAssociationId).eq("available", 1);
        List<FileInfo> fileInfoList = this.getBaseMapper().selectList(queryWrapper);
        List<String> fileIdList = new ArrayList<>();
        for (FileInfo fileInfo : fileInfoList) {
            fileIdList.add(fileInfo.getFileId());
        }
        return fileIdList;
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(String fileId) {
        try {
            FileInfo fileInfo = this.getBaseMapper().selectById(fileId);
            fileInfo.setAvailable(0);
            this.getBaseMapper().deleteById(fileInfo.getFileId());
            //            fileInfo.setAvailable(0);
            //            this.saveOrUpdate(fileInfo);

            //                String filePath = files.getFilePath();
            //                String finalName = files.getFinalName();
            //                File f = new File(filePath);
            //                //数组指向文件夹中的文件和文件夹
            //                File[] fi = f.listFiles();
            //                if (null != fi) {
            //                    //遍历文件和文件夹
            //                    for (File file : fi) {
            //                        /*删除缩略图*/
            //                        if (file.getName().concat("_thumb").equals(finalName)) {
            //                            file.delete();
            //                        }
            //                        /*删除*/
            //                        if (file.getName().equals(finalName)) {
            //                            file.delete();
            //                        }
            //                    }
            //                }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteByFileAssociationId(String fileAssociationId) {
        try {
            QueryWrapper<FileInfo> queryWrapper = new QueryWrapper<>();
            //根据file_id 和传进来的fielId匹配，然后生产sql语句
            queryWrapper.eq("file_association_id", fileAssociationId);
            List<FileInfo> fileInfos = this.getBaseMapper().selectList(queryWrapper);
            for (FileInfo fileInfo : fileInfos) {
                fileInfo.setAvailable(0);
                this.saveOrUpdate(fileInfo);
                //                String filePath = files.getFilePath();
                //                String finalName = files.getFinalName();
                //                File f = new File(filePath);
                //                //数组指向文件夹中的文件和文件夹
                //                File[] fi = f.listFiles();
                //                //遍历文件和文件夹
                //                for (File file : fi) {
                //                    /*删除缩略图*/
                //                    if (file.getName().concat("_thumb").equals(finalName)) {
                //                        file.delete();
                //                    }
                //                    /*删除*/
                //                    if (file.getName().equals(finalName)) {
                //                        file.delete();
                //                    }
                //                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 根据传回的文件id的字符串来将文件从临时表copy到正式表
     */

    public void interimTooffcical(String xczp, String associateid) {
        /*现场照片记录不为空*/
        if (StringUtils.isNotEmpty(xczp)) {
            String[] picFileIds = xczp.split(",");
            /*把不在picFileIds中的照片删除*/
            QueryWrapper<SysFileInfoInterim> sysFileInfoInterimQueryWrapper = new QueryWrapper<>();
            sysFileInfoInterimQueryWrapper.eq("associate_id", associateid).notIn("file_id", picFileIds);
            List<SysFileInfoInterim> sysFileInfoInterimsList = fileInfoInterimService.getBaseMapper().selectList(sysFileInfoInterimQueryWrapper);
            if (!sysFileInfoInterimsList.isEmpty()) {
                for (SysFileInfoInterim sysFileInfoInterim : sysFileInfoInterimsList) {
                    fileInfoInterimService.delete(sysFileInfoInterim.getFileId());
                }
            }
            QueryWrapper<FileInfo> fileInfoQueryWrapper = new QueryWrapper<>();
            fileInfoQueryWrapper.eq("associate_id", associateid).notIn("file_id", picFileIds);
            List<FileInfo> fileInfoList = this.getBaseMapper().selectList(fileInfoQueryWrapper);
            if (!fileInfoList.isEmpty()) {
                for (FileInfo fileInfo : fileInfoList) {
                    this.delete(fileInfo.getFileId());
                }
            }
            /*还需要复制文件关联信息*/
            for (int i = 0; i < picFileIds.length; i++) {
                QueryWrapper<SysFileInfoInterim> sysFileInfoInterimQueryWrapperWithAssidAndFileId = new QueryWrapper<>();
                sysFileInfoInterimQueryWrapperWithAssidAndFileId.eq("associate_id", associateid).eq("file_id", picFileIds[i]);
                SysFileInfoInterim fileInfoInterim = fileInfoInterimService.getBaseMapper().selectOne(sysFileInfoInterimQueryWrapperWithAssidAndFileId);
                if (null != fileInfoInterim) {
                    FileInfo f = new FileInfo();
                    BeanUtils.copyProperties(fileInfoInterim, f, "id");
                    this.saveOrUpdate(f);
                    fileInfoInterim.setAssociateId("0");
                    fileInfoInterimService.delete(fileInfoInterim.getFileId());
                }
            }
        } else {
            {
                /*删除图片文件*/
                QueryWrapper<SysFileInfoInterim> sysFileInfoInterimQueryWrapper = new QueryWrapper<>();
                sysFileInfoInterimQueryWrapper.eq("associate_id", associateid);
                List<SysFileInfoInterim> sysFileInfoInterimsList = fileInfoInterimService.getBaseMapper().selectList(sysFileInfoInterimQueryWrapper);
                if (!sysFileInfoInterimsList.isEmpty()) {
                    for (SysFileInfoInterim sysFileInfoInterim : sysFileInfoInterimsList) {
                        fileInfoInterimService.delete(sysFileInfoInterim.getFileId());
                    }
                }
            }
            {
                QueryWrapper<FileInfo> fileInfoQueryWrapper = new QueryWrapper<>();
                fileInfoQueryWrapper.eq("associate_id", associateid);
                List<FileInfo> fileInfoList = this.getBaseMapper().selectList(fileInfoQueryWrapper);
                if (!fileInfoList.isEmpty()) {
                    for (FileInfo fileInfo : fileInfoList) {
                        this.delete(fileInfo.getFileId());
                    }
                }
            }
        }

    }

    /**
     * 根据文件关联id和文件类型，获得文件列表
     *
     * @param associateid
     * @param filetype
     * @return
     */
    public List<FileInfo> getAssociateFile(String associateid, String filetype) {
        List<FileInfo> res = this.getBaseMapper().selectList(new LambdaQueryWrapper<FileInfo>().eq(FileInfo::getAvailable, 1).eq(FileInfo::getAssociateId, associateid).eq(FileInfo::getFileBusinessType, filetype));
        return res;
    }

}

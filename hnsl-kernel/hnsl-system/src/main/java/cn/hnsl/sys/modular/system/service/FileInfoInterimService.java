package cn.hnsl.sys.modular.system.service;

import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.model.exception.enums.CoreExceptionEnum;
import cn.hnsl.sys.config.UploadVideosConfig;
import cn.hnsl.sys.core.async.AsyncTask;
import cn.hnsl.sys.core.constant.DefaultAvatar;
import cn.hnsl.sys.core.exception.enums.BizExceptionEnum;
import cn.hnsl.sys.modular.enmus.FileInfoBunessEnum;
import cn.hnsl.sys.modular.system.entity.SysFileInfoInterim;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.mapper.FileInfoInterimMapper;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
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
public class FileInfoInterimService extends ServiceImpl<FileInfoInterimMapper, SysFileInfoInterim> {

    @Resource
    private SysUserServiceImpl userService;

    @Resource
    private AsyncTask asyncTask;

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
            SysFileInfoInterim fileInfo = this.getById(avatar);
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
    public String uploadImg(MultipartFile file, SysFileInfoInterim fileInfoTemp) {
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
            fileInfoTemp.setFileName(originalFilename);
            fileInfoTemp.setFileSuffix(fileSuffix);
            /*如果上传的是图斑影像图，则用图斑名称当做文件ID*/
            if (Integer.valueOf(fileInfoTemp.getFileBusinessType()).equals(FileInfoBunessEnum.TBYX.getBuniesstype())) {
                fileId = originalFilename.replace("." + fileSuffix, "");
                fileInfoTemp.setFileYear(Integer.valueOf(fileId.substring(fileId.length() - 4)));
            }
            fileInfoTemp.setFileId(fileId);
            fileInfoTemp.setFilePath(fileSavePath);
            fileInfoTemp.setFileBusinessName(fileInfoTemp.getFileBusinessName());
            fileInfoTemp.setFileBusinessType(fileInfoTemp.getFileBusinessType());
            fileInfoTemp.setFinalName(fileId + "." + ToolUtil.getFileSuffix(originalFilename));
            fileInfoTemp.setAssociateId(fileInfoTemp.getAssociateId());
            //判断是否为图片
            asyncTask.compressImg(newFile, fileId, ToolUtil.getFileSuffix(originalFilename), fileSavePath);

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfoTemp.setFileSizeKb(kb);
            this.saveOrUpdate(fileInfoTemp);
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
            SysFileInfoInterim fileInfo = new SysFileInfoInterim();
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
    public UploadResult uploadFile(MultipartFile file, SysFileInfoInterim fileInfoTemp) {
        String fileSavePath = ConstantsContext.getFileUploadPath();
        return this.uploadFile(file, fileSavePath, fileInfoTemp);
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
            SysFileInfoInterim fileInfo = new SysFileInfoInterim();
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
    public UploadResult uploadFile(MultipartFile file, String fileSavePath, SysFileInfoInterim fileInfoTemp) {

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
            SysFileInfoInterim fileInfo = new SysFileInfoInterim();
            fileInfo.setFileId(fileId);
            fileInfo.setFileName(originalFilename);
            fileInfo.setFileSuffix(fileSuffix);
            fileInfo.setFilePath(fileSavePath);
            fileInfo.setFinalName(finalName);
            fileInfo.setAssociateId(fileInfoTemp.getAssociateId());
            fileInfo.setFileBusinessName(fileInfoTemp.getFileBusinessName());
            fileInfo.setFileBusinessType(fileInfoTemp.getFileBusinessType());

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
    public SysFileInfoInterim getByFinalName(String finalName) {

        QueryWrapper<SysFileInfoInterim> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("final_name", finalName);

        return this.getOne(queryWrapper);
    }

    public byte[] previewImage(String pictureId, Boolean isThumb) {
        if (pictureId == null) {
            return Base64.decode(DefaultAvatar.BASE_64_IMG);
        }

        SysFileInfoInterim fileInfo = this.getById(pictureId);

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
        SysFileInfoInterim fileInfo = this.getById(pictureId);
        try {
            String filePath = fileInfo.getFilePath() + fileInfo.getFinalName();
            return IoUtil.readBytes(new FileInputStream(filePath));
        } catch (FileNotFoundException e) {
            return Base64.decode(DefaultAvatar.BASE_64_IMG);
        }
    }


    public List<SysFileInfoInterim> getFileInfoList(String fileIds) {
        String[] fileIdsToQuery = fileIds.split(",");
        List<SysFileInfoInterim> fileInfoList = this.getBaseMapper().selectList(new LambdaQueryWrapper<SysFileInfoInterim>().in(SysFileInfoInterim::getFileId, fileIdsToQuery));
        return fileInfoList;
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(String fileId) {
        try {
            QueryWrapper<SysFileInfoInterim> queryWrapper = new QueryWrapper<>();
            //根据file_id 和传进来的fielId匹配，然后生产sql语句
            queryWrapper.eq("file_id", fileId);
            List<SysFileInfoInterim> fileInfos = this.getBaseMapper().selectList(queryWrapper);
            for (SysFileInfoInterim files : fileInfos) {
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
                this.getBaseMapper().deleteById(files.getFileId());

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 上传视频
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public String uploadVideos(MultipartFile file, SysFileInfoInterim fileInfoTemp, String fileBusinessName) {

        checkVideos(file);

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
            String fileSavePath = ConstantsContext.getFileUploadPath() + "/videos";
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
            fileInfoTemp.setFileName(originalFilename);
            fileInfoTemp.setFileSuffix(fileSuffix);
            /*如果上传的是图斑影像图，则用图斑名称当做文件ID*/
            if (Integer.valueOf(fileInfoTemp.getFileBusinessType()).equals(FileInfoBunessEnum.TBYX.getBuniesstype())) {
                fileId = originalFilename.replace("." + fileSuffix, "");
                fileInfoTemp.setFileYear(Integer.valueOf(fileId.substring(fileId.length() - 4)));
            }
            fileInfoTemp.setFileId(fileId);
            fileInfoTemp.setFilePath(fileSavePath);
            fileInfoTemp.setFileBusinessName(fileInfoTemp.getFileBusinessName());
            fileInfoTemp.setFileBusinessType(fileInfoTemp.getFileBusinessType());
            fileInfoTemp.setFinalName(fileId + "." + ToolUtil.getFileSuffix(originalFilename));
            fileInfoTemp.setAssociateId(fileInfoTemp.getAssociateId());
            //判断是否为图片
            asyncTask.compressImg(newFile, fileId, ToolUtil.getFileSuffix(originalFilename), fileSavePath);

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize()).divide(BigDecimal.valueOf(1024)).setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfoTemp.setFileSizeKb(kb);
            this.saveOrUpdate(fileInfoTemp);
        } catch (Exception e) {
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return fileId;

    }


    public void checkVideos(MultipartFile file) {
        //判断文件大小的标志位
        int flagSize = 0;
        if (file.isEmpty()) {
            try {
                throw new Exception("请选择文件上传");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        //判断格式
        String suffix = UploadVideosConfig.getFilmSuffix(file.getOriginalFilename());
        if (StringUtils.isEmpty(suffix)) {
            try {
                throw new Exception("上传格式错误,请选择后缀为avi,mp4,mov的视频文件");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        try {
            InputStream inputStream = file.getInputStream();
            if (inputStream.available() > UploadVideosConfig.MAX_FILM_SIZE) {
                flagSize = 1;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (flagSize == 1) {
            try {
                throw new Exception("文件大小不能超过100m");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}

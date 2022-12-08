
package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.enums.BusinessType;
import cn.hnsl.base.log.PostResource;
import cn.hnsl.sys.core.constant.factory.ConstantFactory;
import cn.hnsl.sys.core.log.LogObjectHolder;
import cn.hnsl.sys.modular.enmus.FileInfoBunessEnum;
import cn.hnsl.sys.modular.system.entity.FileInfo;
import cn.hnsl.sys.modular.system.entity.SysFileInfoInterim;
import cn.hnsl.sys.modular.system.service.FileInfoInterimService;
import cn.hnsl.sys.modular.system.service.NoticeService;
import cn.hutool.core.bean.BeanUtil;
import cn.hnsl.base.auth.context.LoginContextHolder;
import cn.hnsl.base.auth.model.LoginUser;
import cn.hnsl.base.oshi.SystemHardwareInfo;
import cn.hnsl.sys.modular.system.entity.Notice;
import cn.hnsl.sys.modular.system.entity.SysUser;
import cn.hnsl.sys.modular.system.model.UploadResult;
import cn.hnsl.sys.modular.system.service.FileInfoService;
import cn.hnsl.sys.modular.system.service.impl.SysUserServiceImpl;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.RequestEmptyException;
import cn.hnsl.model.exception.ServiceException;
import cn.hnsl.model.exception.enums.CoreExceptionEnum;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;

/**
 * 通用控制器
 */
@Controller
@RequestMapping("/system")
@Slf4j
@ApiOperation("文件模块")
public class SystemController extends BaseController {

    @Resource
    private SysUserServiceImpl userService;

    @Resource
    private FileInfoService fileInfoService;

    @Resource
    private FileInfoInterimService fileInfoInterimService;

    @Resource
    private NoticeService noticeService;


    /**
     * 数据监控
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @RequestMapping("/monitor/data")
    @Permission("monitor:data:view")
    public String monitor_data() {
        return "redirect:/druid/index.html";
    }

    /**
     * 服务器监控
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @RequestMapping("/monitor/server")
    @Permission("monitor:server:view")
    public String monitor_server(Model model) {

        SystemHardwareInfo systemHardwareInfo = new SystemHardwareInfo();
        systemHardwareInfo.copyTo();

        model.addAttribute("server", systemHardwareInfo);

        return "/modular/frame/systemInfo.html";
    }

    @RequestMapping("/tool/gen")
    @Permission("tool:gen:view")
    public String tool_gen(Model model) {
        return "redirect:/gen";
    }

    @RequestMapping("/tool/apiDoc")
    @Permission("tool:apiDoc:view")
    public String tool_api(Model model) {
        return "redirect:/swagger-ui.html";
    }


    /**
     * 跳转到首页通知
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:06 PM
     */
    @RequestMapping("/index/notice")
    public String hello() {
        List<Notice> notices = noticeService.list();
        super.setAttr("noticeList", notices);
        return "/modular/frame/notice.html";
    }

    /**
     * 主页面
     *
     * @author fengshuonan
     * @Date 2019/1/24 3:38 PM
     */
    @RequestMapping("/welcome")
    public String welcome() {
        return "/modular/frame/welcome.html";
    }

    /**
     * 主题页面
     *
     * @author fengshuonan
     * @Date 2019/1/24 3:38 PM
     */
    @RequestMapping("/theme")
    public String theme() {
        return "/modular/frame/theme.html";
    }

    /**
     * 锁屏界面
     *
     * @author fengshuonan
     * @Date 2020/3/8 17:19
     */
    @RequestMapping("/lock")
    public String lock() {
        return "/modular/frame/lock-screen.html";
    }

    /**
     * 跳转到修改密码界面
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @RequestMapping("/user_chpwd")
    public String chPwd() {
        return "/modular/frame/password.html";
    }

    /**
     * 个人消息列表
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @RequestMapping("/message")
    public String message() {
        return "/modular/frame/message.html";
    }

    /**
     * 跳转到查看用户详情页面
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @RequestMapping("/user_info")
    public String userInfo(Model model) {
        Long userId = LoginContextHolder.me().getUserId();
        SysUser sysUser = this.userService.getById(userId);

        model.addAllAttributes(BeanUtil.beanToMap(sysUser));
        model.addAttribute("deptName", ConstantFactory.me().getDeptName(sysUser.getDeptId()));
        LogObjectHolder.me().set(sysUser);

        return "/modular/frame/user_info.html";
    }

    /**
     * 通用的树列表选择器
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:59 PM
     */
    @RequestMapping("/commonTree")
    public String deptTreeList(@RequestParam("formName") String formName,
                               @RequestParam("formId") String formId,
                               @RequestParam("treeUrl") String treeUrl,
                               @RequestParam(value = "onlyLeaf", required = false) String onlyLeaf,
                               Model model) {

        if (ToolUtil.isOneEmpty(formName, formId, treeUrl)) {
            throw new RequestEmptyException("请求数据不完整！");
        }

        try {
            model.addAttribute("formName", URLDecoder.decode(formName, "UTF-8"));
            model.addAttribute("formId", URLDecoder.decode(formId, "UTF-8"));
            model.addAttribute("treeUrl", URLDecoder.decode(treeUrl, "UTF-8"));
            model.addAttribute("onlyLeaf", onlyLeaf);
        } catch (UnsupportedEncodingException e) {
            throw new RequestEmptyException("请求数据不完整！");
        }

        return "/common/tree_dlg.html";
    }

    /**
     * 通用的文件上传
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:59 PM
     */
    @RequestMapping("/commonUpload")
    public String commonUpload(@RequestParam("editUrl") String editUrl,//对应的地址
                               @RequestParam("field") String field,//存储文件的字段
                               @RequestParam("keyIdValue") String keyIdValue,//主键值
                               @RequestParam("keyIdName") String keyIdName,//主键名称
                               @RequestParam("fileType") String fileType,//上传的类型
                               Model model) {

        if (ToolUtil.isOneEmpty(editUrl, fileType, field, keyIdName, keyIdValue)) {
            throw new RequestEmptyException("请求数据不完整！");
        }

        try {
            model.addAttribute("editUrl", URLDecoder.decode(editUrl, "UTF-8"));
            model.addAttribute("fileType", URLDecoder.decode(fileType, "UTF-8"));
            model.addAttribute("field", URLDecoder.decode(field, "UTF-8"));
            model.addAttribute("keyIdName", URLDecoder.decode(keyIdName, "UTF-8"));
            model.addAttribute("keyIdValue", URLDecoder.decode(keyIdValue, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            throw new RequestEmptyException("请求数据不完整！");
        }

        return "/common/upload_dlg.html";
    }

    /**
     * 更新头像
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/updateAvatar")
    @ResponseBody
    public Object uploadAvatar(@RequestParam("fileId") String fileId) {

        if (ToolUtil.isEmpty(fileId)) {
            throw new RequestEmptyException("请求头像为空");
        }

        fileInfoService.updateAvatar(fileId);

        return SUCCESS_TIP;
    }

    /**
     * 预览头像
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/previewAvatar")
    @ResponseBody
    public Object previewAvatar(HttpServletResponse response) {

        //输出图片的文件流
        try {
            response.setContentType("image/jpeg");
            byte[] decode = this.fileInfoService.previewAvatar();
            response.getOutputStream().write(decode);
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }

        return null;
    }

    /**
     * 查看图片
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/previewImage/{pictureId}")
    @ResponseBody
    public Object previewImage(@PathVariable("pictureId") String pictureId, HttpServletResponse response) {

        //输出图片的文件流
        try {
            response.setContentType("image/jpeg");
            byte[] decode = this.fileInfoService.previewImage(pictureId, false);
            response.getOutputStream().write(decode);
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }

        return null;
    }

    /**
     * 从临时表查看图片
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/previewImageFromInterim/{pictureId}")
    @ResponseBody
    public Object previewImageFromInterim(@PathVariable("pictureId") String pictureId, HttpServletResponse response) {

        //输出图片的文件流
        try {
            response.setContentType("image/jpeg");
            byte[] decode = this.fileInfoInterimService.previewImage(pictureId, false);
            response.getOutputStream().write(decode);
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }

        return null;
    }

    /**
     * 查看缩略图
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/thumbImage/{pictureId}")
    @ResponseBody
    public Object thumbImage(@PathVariable("pictureId") String pictureId, HttpServletResponse response) {

        //输出图片的文件流
        try {
            response.setContentType("image/jpeg");
            byte[] decode = this.fileInfoService.previewImage(pictureId, true);
            response.getOutputStream().write(decode);
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }

        return null;
    }

    /**
     * 缺省图
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/noImage")
    @ResponseBody
    public Object noImage(HttpServletResponse response) {

        //输出图片的文件流
        try {
            response.setContentType("image/jpeg");
            byte[] decode = this.fileInfoService.previewImage(null, false);
            response.getOutputStream().write(decode);
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }

        return null;
    }

    /**
     * 获取当前用户详情
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:59 PM
     */
    @RequestMapping("/currentUserInfo")
    @ResponseBody
    public ResponseData getUserInfo() {

        LoginUser currentUser = LoginContextHolder.me().getLoginUser();
        if (currentUser == null) {
            throw new ServiceException(CoreExceptionEnum.NO_CURRENT_USER);
        }

        return new SuccessResponseData(userService.getUserInfo(currentUser.getId()));
    }

    /**
     * layui上传组件 通用文件上传接口
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload/file")
    @ResponseBody
    public ResponseData layuiUpload(@RequestPart("file") MultipartFile file) {

        UploadResult uploadResult = this.fileInfoService.uploadFile(file);
        String fileId = uploadResult.getFileId();

        HashMap<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);

        return ResponseData.success("200", "上传成功", map);
    }

    /**
     * layui上传组件 通用文件上传接口
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload/image")
    @ResponseBody
    public ResponseData layuiUploadImage(@RequestPart("file") MultipartFile file, FileInfo fileInfoTemp) {

        String fileId = this.fileInfoService.uploadImg(file, fileInfoTemp);

        HashMap<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);

        return ResponseData.success("200", "上传成功", map);
    }

    /**
     * layui上传组件 如果有关联id，通用文件上传接口
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload/image_assosicateid")
    @ResponseBody
    public ResponseData layuiUploadImage2(@RequestPart("file") MultipartFile file, FileInfo fileInfoTemp, String fileBusinessName, String associateid) {
        //截取filebusinessName
        fileBusinessName = fileBusinessName.substring(fileBusinessName.substring(0, fileBusinessName.indexOf(',')).length() + 1, fileBusinessName.length());
        /**
         * 判断图片类型，并赋值文件关联id
         */
        if (fileBusinessName.equals("图斑影像图")) {
            fileInfoTemp.setAssociateId(associateid);
            fileInfoTemp.setFileBusinessName(fileBusinessName);
            fileInfoTemp.setFileBusinessType("1");
        } else if (fileBusinessName.equals("规划图")) {
            fileInfoTemp.setAssociateId(associateid);
            fileInfoTemp.setFileBusinessName(fileBusinessName);
            fileInfoTemp.setFileBusinessType("3");
        } else if (fileBusinessName.equals("核查")) {
            fileInfoTemp.setAssociateId(associateid);
            fileInfoTemp.setFileBusinessName(fileBusinessName);
            fileInfoTemp.setFileBusinessType("2");
        } else {
            return ResponseData.error("请选择图片类型!");
        }
        String assosicate = this.fileInfoService.uploadImg(file, fileInfoTemp, fileInfoTemp.getAssociateId());
        return ResponseData.success("200", "上传成功", assosicate);
    }

    /**
     * layui图片批量上传组件 需要关联id和图斑id相同
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload/image_assosicateid_more")
    @ResponseBody
    public ResponseData layuiUploadImage2(@RequestPart("file") MultipartFile file, FileInfo fileInfoTemp, String fileBusinessName) {
        //截取filebusinessName
        fileBusinessName = fileBusinessName.substring(fileBusinessName.substring(0, fileBusinessName.indexOf(',')).length() + 1, fileBusinessName.length());
        /**
         * 判断图片类型，并赋值文件关联id
         */
        String associateid = new String();
        if (fileBusinessName.equals("图斑影像图")) {
            fileInfoTemp.setAssociateId(associateid);
            fileInfoTemp.setFileBusinessName(fileBusinessName);
            fileInfoTemp.setFileBusinessType("1");
        } else if (fileBusinessName.equals("规划图")) {
            fileInfoTemp.setAssociateId(associateid);
            fileInfoTemp.setFileBusinessName(fileBusinessName);
            fileInfoTemp.setFileBusinessType("3");
        } else if (fileBusinessName.equals("核查")) {
            fileInfoTemp.setAssociateId(associateid);
            fileInfoTemp.setFileBusinessName(fileBusinessName);
            fileInfoTemp.setFileBusinessType("2");
        } else {
            return ResponseData.error("请选择图片类型!");
        }
        String assosicate = this.fileInfoService.uploadImg(file, fileInfoTemp, associateid);
        return ResponseData.success("200", "上传成功", assosicate);
    }


    /**
     * layui上传组件 通用文件上传接口
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload/images")
    @ResponseBody
    public ResponseData layuiUploadImages(@RequestPart("files") MultipartFile[] files) {
        String fileIds = this.fileInfoService.uploadImgs(files);
        HashMap<String, Object> map = new HashMap<>();
        map.put("fileIds", fileIds);
        return ResponseData.success("200", "上传成功", map);
    }


    /**
     * 移动端APP上传图片接口
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping(method = RequestMethod.POST, path = "/app/upload/images")
    @ResponseBody
    public ResponseData appUploadImages(@RequestPart("files") MultipartFile[] files, SysFileInfoInterim fileInfoTemp) {
        String fileIds = "";
        fileInfoTemp.setFileBusinessType(String.valueOf(FileInfoBunessEnum.YWHC.getBuniesstype()));
        fileInfoTemp.setFileBusinessName(FileInfoBunessEnum.YWHC.getBuniessName());
        for (MultipartFile f : files) {
            String fileId = this.fileInfoInterimService.uploadImg(f, fileInfoTemp);
            fileIds = fileIds + "," + fileId;
        }
        fileIds = fileIds.substring(1);

        HashMap<String, Object> map = new HashMap<>();
        map.put("fileIds", fileIds);

        return ResponseData.success("200", "上传成功", map);
    }

    @RequestMapping("/preview/file/{projectId}")
    @ResponseBody
    public Object pdf(@PathVariable("projectId") String projectId, HttpServletResponse response) {
        //输出pdf文档的文件流
        try {
            if (projectId.contains(",")) {
                /**
                 * 解析关联id和业务类型的字符串
                 */
                int No = projectId.indexOf(',');
                String associateId = projectId.substring(0, No).replaceAll(" ","");
                String businesstype = projectId.substring(No + 1);
                response.setContentType("application/pdf");
                byte[] decode = this.fileInfoService.previewFile(associateId, businesstype);
                response.getOutputStream().write(decode);
            } else {
                //传入的projectId有可能是文件id，先从正式表找，再从临时表找
                if (fileInfoService.getById(projectId) != null) {
                    byte[] decode = this.fileInfoService.previewFile(projectId);
                    /**
                     * 没有文件类型的预览，需要查询临时表
                     */
                    response.setContentType("application/pdf");
                    response.getOutputStream().write(decode);
                } else {
                    byte[] decode = this.fileInfoInterimService.previewFile(projectId);
                    /**
                     * 没有文件类型的预览，需要查询临时表
                     */
                    response.setContentType("application/pdf");
                    response.getOutputStream().write(decode);
                }
            }
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }
        return null;
    }


    /**
     * 根据图斑编号ID获取该图斑对应文件信息列表
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping("/fileInfo/{fileId}")
    @ResponseBody
    public ResponseData fileInfo(@PathVariable("associateId") String associateId) {
        List<FileInfo> fileInfoList = fileInfoService.getFileInfoList(associateId);
        return ResponseData.success(fileInfoList);
    }

    /**
     * 删除
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @PostResource(path = "/delete", modular = "系统管理-用户管理-删除文件", businessType = BusinessType.DELETE)
    @ResponseBody
    public ResponseData delete(String fileId) {
        this.fileInfoService.delete(fileId);
        return ResponseData.success();
    }

    /**
     * 从临时表删除
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @PostResource(path = "/deleteInterim", modular = "系统管理-用户管理-删除文件", businessType = BusinessType.DELETE)
    @ResponseBody
    public ResponseData deleteFromInterim(String fileId) {
        fileInfoInterimService.delete(fileId);
        return ResponseData.success();
    }


    /**
     * layui上传组件 视频文件上传
     *
     * @author fengshuonan
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload/video")
    @ResponseBody
    public ResponseData layuiUploadVideo(@RequestPart("files") MultipartFile files, SysFileInfoInterim fileInfoTemp, String fileBusinessName) {

        String fileIds = fileInfoInterimService.uploadVideos(files, fileInfoTemp, fileBusinessName);
        HashMap<String, Object> map = new HashMap<>();
        map.put("fileIds", fileIds);
        return ResponseData.success("200", "上传成功", map);
    }


}

package cn.hnsl.excel.controller;

import cn.hnsl.base.consts.ConstantsContext;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.excel.entity.ExcelExportDeploy;
import cn.hnsl.excel.service.ExcelExportDeployService;
import cn.hnsl.excel.util.GroovyUtil;
import cn.hnsl.excel.view.JxlsExcelView;
import cn.hnsl.model.response.ErrorResponseData;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import com.alibaba.fastjson.support.spring.FastJsonJsonView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Excel的导出配置
 *
 * @author fengshuonan
 * @Date 2019/12/31 22:09
 */
@Controller
@RequestMapping("/excelExport")
public class ExcelExportController {

    @Resource
    private ExcelExportDeployService excelExportDeployService;

    /**
     * 查看数据格式
     *
     * @param nid 导出模板的唯一标识
     * @author fengshuonan
     * @Date 2019/12/31 22:12
     */
    @ResponseBody
    @RequestMapping(value = "/show/{nid}")
    public ResponseData showExport(@PathVariable("nid") String nid, HttpServletRequest request) {

        ExcelExportDeploy excelExportDeployParam = new ExcelExportDeploy();
        excelExportDeployParam.setNid(nid);
        ExcelExportDeploy excelExportDeploy = excelExportDeployService.findBySpec(excelExportDeployParam);

        //执行groovy脚本中的类的方法
        if (excelExportDeploy != null) {
            String groovyText = excelExportDeploy.getDataSource();
            Object result = GroovyUtil.executeClassMethod(groovyText, "run", new Class[]{HttpServletRequest.class}, new Object[]{request});
            return new SuccessResponseData(result);
        } else {
            return new ErrorResponseData("模版未定义");
        }
    }

    /**
     * 导出链接
     *
     * @author fengshuonan
     * @Date 2019/12/31 22:12
     */
    @RequestMapping(value = "/export/{nid}")
    public ModelAndView export(@PathVariable("nid") String nid, HttpServletRequest request) {

        ExcelExportDeploy excelExportDeployParam = new ExcelExportDeploy();
        excelExportDeployParam.setNid(nid);
        ExcelExportDeploy excelExportDeploy = excelExportDeployService.findBySpec(excelExportDeployParam);

        //执行groovy脚本中的类的方法
        if (excelExportDeploy != null) {
            String groovyText = excelExportDeploy.getDataSource();
            Object result = GroovyUtil.executeClassMethod(groovyText, "run", new Class[]{HttpServletRequest.class}, new Object[]{request});
            if (result != null) {
                Map<String, Object> resultMap = ToolUtil.toMap(result);

                //文件输出目录
                String path = ConstantsContext.getFileUploadPath() + excelExportDeploy.getTemplate();

                //构造响应文件的标题
                String title = ToolUtil.stringReplaceBuild(excelExportDeploy.getTitle(), resultMap);

                //输出文件格式解析
                String type = excelExportDeploy.getTemplate().contains(".xlsx") ? ".xlsx" : ".xls";

                return new ModelAndView(new JxlsExcelView(path, title, type), resultMap);
            } else {
                ModelAndView mav = new ModelAndView(new FastJsonJsonView());
                mav.addObject(new ErrorResponseData("脚本执行结果为空"));
                return mav;
            }
        } else {
            ModelAndView mav = new ModelAndView(new FastJsonJsonView());
            mav.addObject(new ErrorResponseData("模板未定义"));
            return mav;
        }
    }
}

package cn.hnsl.excel.view;


import cn.hnsl.excel.util.JxlsUtils;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

/**
 * 渲染excel的springmvc响应view
 *
 * @author fengshuonan
 * @Date 2019/12/29 18:17
 */
public class JxlsExcelView extends AbstractView {

    private static final String CONTENT_TYPE = "application/vnd.ms-excel";

    private String templatePath;
    private String exportFileName;
    private String type = ".xls";

    /**
     * @param templatePath   模版相对于当前classpath路径
     * @param exportFileName 导出文件名
     */
    public JxlsExcelView(String templatePath, String exportFileName, String type) {
        this.templatePath = templatePath;
        this.exportFileName = exportFileName;
        if (type != null && !type.equals("")) {
            this.type = type;
        }
        setContentType(CONTENT_TYPE);
    }

    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {
        InputStream inputStream = null;
        OutputStream outputStream = null;
        outputStream = response.getOutputStream();
        response.setContentType(getContentType());

        // 解决导出文件名中文乱码
        String filename = new String(exportFileName.getBytes("gb2312"), "iso8859-1");
        response.setHeader("content-disposition", "attachment;filename=" + filename + type);

        // 获取excel模板
        inputStream = new FileInputStream(new File(templatePath));
        JxlsUtils.exportExcel(inputStream, outputStream, model);

        // 将内容写入输出流并把缓存的内容全部发出去
//	        workbook.write(os);
        outputStream.flush();
        outputStream.close();
        inputStream.close();
    }

}

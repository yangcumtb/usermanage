package cn.hnsl.excel.util;

import cn.hnsl.excel.MergeCellValue;
import lombok.extern.slf4j.Slf4j;
import org.jxls.common.Context;
import org.jxls.expression.JexlExpressionEvaluator;
import org.jxls.transform.Transformer;
import org.jxls.transform.poi.WritableCellValue;
import org.jxls.util.JxlsHelper;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * excel工具类
 *
 * @author fengshuonan
 * @Date 2019/12/29 18:14
 */
@Slf4j
public class JxlsUtils {

    /**
     * 导出excel
     *
     * @author fengshuonan
     * @Date 2019/12/29 18:20
     */
    public static void exportExcel(InputStream inputStream, OutputStream outputStream, Map<String, Object> model) {
        Context context = new Context();
        if (model != null) {
            for (String key : model.keySet()) {
                context.putVar(key, model.get(key));
            }
        }
        JxlsHelper jxlsHelper = JxlsHelper.getInstance();
        Transformer transformer = jxlsHelper.createTransformer(inputStream, outputStream);

        //增加导出过程中自定义工具类
        JexlExpressionEvaluator evaluator = (JexlExpressionEvaluator) transformer.getTransformationConfig().getExpressionEvaluator();
        Map<String, Object> funcs = new HashMap<>();
        funcs.put("utils", new JxlsUtils());
        evaluator.getJexlEngine().setFunctions(funcs);

        try {
            // 必须要这个，否者表格函数统计会错乱
            jxlsHelper.setUseFastFormulaProcessor(false).processTemplate(context, transformer);
        } catch (IOException e) {
            log.error("导出excel过程出错！", e);
        }
    }

    /**
     * 横向单元格合并
     *
     * @author fengshuonan
     * @Date 2019/12/29 18:31
     */
    public WritableCellValue mergeCell(String value, Integer mergerRows) {
        return new MergeCellValue(value, mergerRows);

    }
}

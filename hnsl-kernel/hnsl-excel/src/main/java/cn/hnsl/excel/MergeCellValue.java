package cn.hnsl.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.jxls.common.Context;
import org.jxls.transform.poi.WritableCellValue;

/**
 * 自定义背景颜色单元格，根据单元格的值来显示
 *
 * @author fengshuonan
 * @Date 2019/12/29 18:26
 */
public class MergeCellValue implements WritableCellValue {

    private String value;
    private Integer mergerRows;

    public MergeCellValue(String value, Integer mergerRows) {
        System.out.println("合并单元格值为" + value + "；合并数量:" + mergerRows);
        this.value = value;
        this.mergerRows = mergerRows;
    }

    // 报错的原因是由于当前单元格已经与上一行进行了合并，所以当下一行想与上一行进行合并时，需要再网上合并一行，以此类推
    @Override
    public Object writeToCell(Cell cell, Context context) {
        cell.setCellValue(value);

        if (mergerRows == null || mergerRows.intValue() <= 0) {
            return cell;
        }
        mergerRows = mergerRows - 1;
        int rowIndex = cell.getRowIndex();
        Sheet sheet = cell.getSheet();
        int cellIndex = cell.getColumnIndex();

        // 起始行号，终止行号， 起始列号，终止列号
        sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, cellIndex, cellIndex + mergerRows));
        return cell;
    }

}

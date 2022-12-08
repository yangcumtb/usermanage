package cn.hnsl.core.page;

import cn.hnsl.model.page.PageResult;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.PageUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.util.List;

public class PageResultFactory {

    /**
     * 将mybatis-plus的page转成自定义的PageResult，扩展了totalPage总页数
     *
     * @author fengshuonan
     * @date 2020/10/15 15:53
     */
    public static <T> PageResult<T> createPageResult(Page<T> page) {
        PageResult<T> pageResult = new PageResult<>();
        pageResult.setRows(page.getRecords());
        pageResult.setTotalRows(Convert.toLong(page.getTotal()));
        pageResult.setPage(Convert.toInt(page.getCurrent()));
        pageResult.setPageSize(Convert.toInt(page.getSize()));
        pageResult.setTotalPage(
                PageUtil.totalPage(Convert.toInt(pageResult.getTotalRows()), pageResult.getPageSize()));
        return pageResult;
    }

    /**
     * 将mybatis-plus的page转成自定义的PageResult，扩展了totalPage总页数
     *
     * @author fengshuonan
     * @date 2020/10/15 15:53
     */
    public static <T> PageResult<T> createPageResult(List<T> rows, Long count, Integer pageSize, Integer pageNo) {
        PageResult<T> pageResult = new PageResult<>();
        pageResult.setRows(rows);
        pageResult.setTotalRows(Convert.toLong(count));
        pageResult.setPage(pageNo);
        pageResult.setPageSize(pageSize);
        pageResult.setTotalPage(PageUtil.totalPage(Convert.toInt(pageResult.getTotalRows()), pageSize));
        return pageResult;
    }
}

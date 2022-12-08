package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.DictType;
import cn.hnsl.sys.modular.system.model.params.DictTypeParam;
import cn.hnsl.sys.modular.system.service.DictTypeService;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * 字典类型表控制器
 *
 * @author spot
 * @Date 2019-03-13 13:53:54
 */
@Controller
@RequestMapping("/system/dictType")
public class DictTypeController extends BaseController {

    private String PREFIX = "/modular/system/dictType";

    @Resource
    private DictTypeService dictTypeService;

    /**
     * 跳转到主页面
     *
     * @author spot
     * @Date 2019-03-13
     */
    @RequestMapping("")
    @Permission("system:dict:view")
    public String index() {
        return PREFIX + "/dictType.html";
    }

    /**
     * 新增页面
     *
     * @author spot
     * @Date 2019-03-13
     */
    @GetMapping("/add")
    @Permission("system:dict:add")
    public String add() {
        return PREFIX + "/dictType_add.html";
    }

    /**
     * 编辑页面
     *
     * @author spot
     * @Date 2019-03-13
     */
    @GetMapping("/edit")
    @Permission("system:dict:edit")
    public String edit() {
        return PREFIX + "/dictType_edit.html";
    }

    /**
     * 新增接口
     *
     * @author spot
     * @Date 2019-03-13
     */
    @PostMapping("/add")
    @Permission("system:dict:add")
    @ResponseBody
    public ResponseData addItem(DictTypeParam dictTypeParam) {
        this.dictTypeService.add(dictTypeParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author spot
     * @Date 2019-03-13
     */
    @PostMapping("/edit")
    @Permission("system:dict:edit")
    @ResponseBody
    public ResponseData editItem(DictTypeParam dictTypeParam) {
        this.dictTypeService.update(dictTypeParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author spot
     * @Date 2019-03-13
     */
    @PostMapping("/delete")
    @Permission("system:dict:remove")
    @ResponseBody
    public ResponseData delete(DictTypeParam dictTypeParam) {
        this.dictTypeService.delete(dictTypeParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author spot
     * @Date 2019-03-13
     */
    @RequestMapping("/detail")
    @ResponseBody
    public ResponseData detail(DictTypeParam dictTypeParam) {
        DictType detail = this.dictTypeService.getById(dictTypeParam.getDictTypeId());
        return ResponseData.success(detail);
    }

    /**
     * 查询列表
     *
     * @author spot
     * @Date 2019-03-13
     */
    @ResponseBody
    @RequestMapping("/list")
    @Permission("system:dict:list")
    public LayuiPageInfo list(DictTypeParam dictTypeParam) {
        return this.dictTypeService.findPageBySpec(dictTypeParam);
    }

    /**
     * 查询所有字典
     *
     * @author spot
     * @Date 2019-03-13
     */
    @ResponseBody
    @RequestMapping("/listTypes")
    @Permission("system:dict:list")
    public ResponseData listTypes() {

        QueryWrapper<DictType> objectQueryWrapper = new QueryWrapper<>();
        objectQueryWrapper.select("dict_type_id", "code", "name");

        List<DictType> list = this.dictTypeService.list(objectQueryWrapper);
        return new SuccessResponseData(list);
    }

}



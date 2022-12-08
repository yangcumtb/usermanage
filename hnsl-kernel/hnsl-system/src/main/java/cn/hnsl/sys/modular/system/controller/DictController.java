package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.pojo.node.ZTreeNode;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.Dict;
import cn.hnsl.sys.modular.system.entity.DictType;
import cn.hnsl.sys.modular.system.model.params.DictParam;
import cn.hnsl.sys.modular.system.model.result.DictResult;
import cn.hnsl.sys.modular.system.service.DictService;
import cn.hnsl.sys.modular.system.service.DictTypeService;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.model.exception.RequestEmptyException;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * 基础字典控制器
 *
 * @author spot
 * @Date 2019-03-13 13:53:53
 */
@Controller
@RequestMapping("/system/dict")
public class DictController extends BaseController {

    private String PREFIX = "/modular/system/dict";

    @Resource
    private DictService dictService;

    @Resource
    private DictTypeService dictTypeService;

    /**
     * 跳转到主页面
     *
     * @author spot
     * @Date 2019-03-13
     */
    @GetMapping("")
    @Permission("system:dict:view")
    public String index(@RequestParam("dictTypeId") Long dictTypeId, Model model) {
        model.addAttribute("dictTypeId", dictTypeId);

        //获取type的名称
        DictType dictType = dictTypeService.getById(dictTypeId);
        if (dictType == null) {
            throw new RequestEmptyException();
        }
        model.addAttribute("dictTypeName", dictType.getName());

        return PREFIX + "/dict.html";
    }

    /**
     * 新增页面
     *
     * @author spot
     * @Date 2019-03-13
     */
    @GetMapping("/add")
    @Permission("system:dict:add")
    public String add(@RequestParam("dictTypeId") Long dictTypeId, Model model) {
        model.addAttribute("dictTypeId", dictTypeId);

        //获取type的名称
        DictType dictType = dictTypeService.getById(dictTypeId);
        if (dictType == null) {
            throw new RequestEmptyException();
        }

        model.addAttribute("dictTypeName", dictType.getName());
        return PREFIX + "/dict_add.html";
    }

    /**
     * 编辑页面
     *
     * @author spot
     * @Date 2019-03-13
     */
    @GetMapping("/edit")
    @Permission("system:dict:edit")
    public String edit(@RequestParam("dictId") Long dictId, Model model) {

        //获取type的id
        Dict dict = dictService.getById(dictId);
        if (dict == null) {
            throw new RequestEmptyException();
        }

        //获取type的名称
        DictType dictType = dictTypeService.getById(dict.getDictTypeId());
        if (dictType == null) {
            throw new RequestEmptyException();
        }

        model.addAttribute("dictTypeId", dict.getDictTypeId());
        model.addAttribute("dictTypeName", dictType.getName());

        return PREFIX + "/dict_edit.html";
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
    public ResponseData addItem(DictParam dictParam) {
        this.dictService.add(dictParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author spot
     * @Date 2019-03-13
     */
    @PostMapping("/editItem")
    @Permission("system:dict:edit")
    @ResponseBody
    public ResponseData editItem(DictParam dictParam) {
        this.dictService.update(dictParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author spot
     * @Date 2019-03-13
     */
    @RequestMapping("/delete")
    @Permission("system:dict:remove")
    @ResponseBody
    public ResponseData delete(DictParam dictParam) {
        this.dictService.delete(dictParam);
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
    public ResponseData detail(DictParam dictParam) {
        DictResult dictResult = this.dictService.dictDetail(dictParam.getDictId());
        return ResponseData.success(dictResult);
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
    public LayuiPageInfo list(DictParam dictParam) {
        return this.dictService.findPageBySpec(dictParam);
    }

    /**
     * 获取某个字典类型下的所有字典
     *
     * @author spot
     * @Date 2019-03-13
     */
    @ResponseBody
    @RequestMapping("/listDicts")
    public ResponseData listDicts(@RequestParam("dictTypeId") Long dictTypeId) {
        List<Dict> dicts = this.dictService.listDicts(dictTypeId);
        return new SuccessResponseData(dicts);
    }

    /**
     * 获取某个字典类型下的所有字典
     *
     * @author spot
     * @Date 2019-03-13
     */
    @ResponseBody
    @RequestMapping("/listDictsByCode")
    public ResponseData listDictsByCode(@RequestParam("dictTypeCode") String dictTypeCode) {
        List<Dict> dicts = this.dictService.listDictsByCode(dictTypeCode);
        return new SuccessResponseData(dicts);
    }

    /**
     * 获取某个类型下字典树的列表，ztree格式
     *
     * @author fengshuonan
     * @Date 2018/12/23 4:56 PM
     */
    @RequestMapping(value = "/ztree")
    @ResponseBody
    public List<ZTreeNode> ztree(@RequestParam("dictTypeId") Long dictTypeId, @RequestParam(value = "dictId", required = false) Long dictId) {
        return this.dictService.dictTreeList(dictTypeId, dictId);
    }

}



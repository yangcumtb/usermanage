package cn.hnsl.sys.modular.system.controller;

import cn.hnsl.base.auth.annotion.Permission;
import cn.hnsl.base.enums.CommonStatus;
import cn.hnsl.base.pojo.page.LayuiPageInfo;
import cn.hnsl.sys.modular.system.entity.Position;
import cn.hnsl.sys.modular.system.model.params.PositionParam;
import cn.hnsl.sys.modular.system.service.PositionService;
import cn.hnsl.sys.modular.system.service.UserPosService;
import cn.hnsl.core.base.controller.BaseController;
import cn.hnsl.core.util.ToolUtil;
import cn.hnsl.model.exception.RequestEmptyException;
import cn.hnsl.model.response.ResponseData;
import cn.hnsl.model.response.SuccessResponseData;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


/**
 * 职位表控制器
 *
 * @author spot
 * @Date 2019-06-27 21:33:47
 */
@Controller
@RequestMapping("/system/post")
public class SysPostController extends BaseController {

    private String PREFIX = "/modular/system/position";

    @Resource
    private PositionService positionService;

    /**
     * 跳转到主页面
     *
     * @author spot
     * @Date 2019-06-27
     */
    @GetMapping("")
    @Permission("system:post:view")
    public String index() {
        return PREFIX + "/position.html";
    }

    /**
     * 新增页面
     *
     * @author spot
     * @Date 2019-06-27
     */
    @GetMapping("/add")
    @Permission("system:post:add")
    public String addView() {
        return PREFIX + "/position_add.html";
    }

    /**
     * 编辑页面
     *
     * @author spot
     * @Date 2019-06-27
     */
    @GetMapping("/edit")
    @Permission("system:post:edit")
    public String editView() {
        return PREFIX + "/position_edit.html";
    }

    /**
     * 新增接口
     *
     * @author spot
     * @Date 2019-06-27
     */
    @PostMapping("/add")
    @Permission("system:post:add")
    @ResponseBody
    public ResponseData addItem(PositionParam positionParam) {
        this.positionService.add(positionParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author spot
     * @Date 2019-06-27
     */
    @PostMapping("/edit")
    @Permission("system:post:edit")
    @ResponseBody
    public ResponseData editItem(PositionParam positionParam) {
        this.positionService.update(positionParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author spot
     * @Date 2019-06-27
     */
    @PostMapping("/delete")
    @Permission("system:post:remove")
    @ResponseBody
    public ResponseData delete(PositionParam positionParam) {
        this.positionService.delete(positionParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author spot
     * @Date 2019-06-27
     */
    @GetMapping("/detail")
    @ResponseBody
    public ResponseData detail(PositionParam positionParam) {
        Position detail = this.positionService.getById(positionParam.getPositionId());
        return ResponseData.success(detail);
    }

    /**
     * 查询列表
     *
     * @author spot
     * @Date 2019-06-27
     */
    @ResponseBody
    @GetMapping("/list")
    @Permission("system:post:list")
    public LayuiPageInfo list(@RequestParam(value = "condition", required = false) String condition) {

        PositionParam positionParam = new PositionParam();
        if (ToolUtil.isNotEmpty(condition)) {
            positionParam.setCode(condition);
            positionParam.setName(condition);
        }

        return this.positionService.findPageBySpec(positionParam);
    }

    /**
     * 修改状态
     *
     * @author spot
     * @Date 2019-06-27
     */
    @ResponseBody
    @PostMapping("/changeStatus")
    @Permission("system:post:edit")
    public ResponseData changeStatus(@RequestParam("positionId") String positionId,
                                     @RequestParam("status") Boolean status) {

        Position position = this.positionService.getById(positionId);
        if (position == null) {
            throw new RequestEmptyException();
        }

        if (status) {
            position.setStatus(CommonStatus.ENABLE.getCode());
        } else {
            position.setStatus(CommonStatus.DISABLE.getCode());
        }

        this.positionService.updateById(position);

        return new SuccessResponseData();
    }

    /**
     * 查询所有职位
     *
     * @author spot
     * @Date 2019-03-13
     */
    @ResponseBody
    @GetMapping("/listPositions")
    @Permission("system:post:list")
    public LayuiPageInfo listlistPositionsTypes(@RequestParam(value = "userId", required = false) Long userId) {
        return this.positionService.listPositions(userId);
    }


}



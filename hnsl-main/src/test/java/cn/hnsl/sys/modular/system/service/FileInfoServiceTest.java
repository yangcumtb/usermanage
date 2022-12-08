package cn.hnsl.sys.modular.system.service;

import cn.hnsl.StartApplication;
import cn.hnsl.sys.modular.system.entity.SysMenu;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import junit.framework.TestCase;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = StartApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class FileInfoServiceTest extends TestCase {


    @Resource
    private FileInfoService fileInfoService;

    @Resource
    private SysMenuService sysMenuService;


    @Test
    public void testPreviewFile() {

    }

    @Test
    public void testDelete() {
        //  删除高级目录
        String meunid = "1503747468318564402";
        List<SysMenu> deletelist = new ArrayList<>();
        deletelist.add(sysMenuService.getById(meunid));
        List<SysMenu> nowlevel = new ArrayList<>();
        //最高级菜单
        nowlevel.add(sysMenuService.getById(meunid));
        List<SysMenu> nextlevel = new ArrayList<>();
        nextlevel = deletelist;
        while (nextlevel.size() !=0){
            nextlevel = getmenuTree(nextlevel);
            deletelist.addAll(nextlevel);
        }

        System.out.println(deletelist);

        deletelist.forEach(sysMenu -> {
            sysMenuService.removeById(sysMenu.getMenuId());
        });

    }

    public List<SysMenu> getmenuTree(List<SysMenu> nowList){
        List<SysMenu> nextList = new ArrayList<>();
        for (SysMenu sysMenu:nowList){
            nextList.addAll(sysMenuService.getBaseMapper().selectList(new QueryWrapper<SysMenu>().eq("parent_id",sysMenu.getMenuId())));
        }
        return nextList;
    }




}

package cn.hnsl.sys.core.util;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.File;

public class CusFilesUtil {

    /**
     * 通过读取文件并获取其width及height的方式，来判断判断当前文件是否图片，这是一种非常简单的方式。
     *
     * @param imageFile
     * @return
     */
    public static boolean isImage(File imageFile) {
        if (!imageFile.exists()) {
            return false;
        }
        Image img = null;
        try {
            img = ImageIO.read(imageFile);
            if (img == null || img.getWidth(null) <= 0 || img.getHeight(null) <= 0) {
                return false;
            }
            return true;
        } catch (Exception e) {
            return false;
        } finally {
            img = null;
        }
    }

    public static void main(String[] args) {
        String time = "202006";
        System.out.printf(time.substring(0, 4) + "年" + time.substring(4,6) + "月");
    }

}



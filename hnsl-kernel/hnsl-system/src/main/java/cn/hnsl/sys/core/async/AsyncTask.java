package cn.hnsl.sys.core.async;


import cn.hnsl.sys.core.util.CusFilesUtil;
import cn.hutool.core.img.ImgUtil;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * 异步方法集合
 */
@Component
public class AsyncTask {

    @Async
    public void compressImg(File file, String fileId, String fileSuffix, String fileSavePath) {
        if (CusFilesUtil.isImage(file)) {
            String thumbName = fileId + "_thumb." + fileSuffix;
            File thumbFile = new File(fileSavePath + thumbName);
            ImgUtil.scale(file, thumbFile, 0.1f);

            String previewName = fileId + "." + fileSuffix;
            File previewFile = new File(fileSavePath + previewName);
            ImgUtil.scale(file, previewFile, 0.3f);
        }
    }
}

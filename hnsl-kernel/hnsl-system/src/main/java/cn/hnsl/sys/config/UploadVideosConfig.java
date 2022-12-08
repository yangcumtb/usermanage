package cn.hnsl.sys.config;

import org.apache.commons.lang3.StringUtils;

public class UploadVideosConfig {
    //上传电影地址 windows系统
    public static final String WINDOWS_UPLOAD_PATH = "D:/YouDaStorage/";
    //上传电影地址 linux系统
    public static final String LINUX_UPLOAD_PATH = "/home/deploy/YouDaStorage";

    //上传电影封面指定大小  30MB
    public static final long MAX_PHOTO_SIZE = 30 * 1024 * 1024;
    //上传电影资源指定大小  5GB
    public static final Long MAX_FILM_SIZE = 5 * 1024 * 1024 * 1024L;

    //视频文件后缀为avi,mp4,mov,wmv,flv,MPEG
    public static String getFilmSuffix(String fileName) {
        if (org.apache.commons.lang3.StringUtils.isBlank(fileName)) {
            return null;
        }
        if (fileName.endsWith(".avi")) {
            return ".avi";
        }
        if (fileName.endsWith(".mp4")) {
            return ".mp4";
        }
        if (fileName.endsWith(".mov")) {
            return ".mov";
        }
        if (fileName.endsWith(".wmv")) {
            return ".wmv";
        }
        if (fileName.endsWith(".flv")) {
            return ".flv";
        }
        if (fileName.endsWith(".MPEG")) {
            return ".MPEG";
        }
        return null;
    }

    //照片后缀为jpg,png,jpeg
    public static String getPhotoSuffix(String fileName) {
        if (StringUtils.isBlank(fileName)) {
            return null;
        }
        if (fileName.endsWith(".jpg")) {
            return ".jpg";
        }
        if (fileName.endsWith(".png")) {
            return ".png";
        }
        if (fileName.endsWith(".jpeg")) {
            return ".jpeg";
        }
        return null;
    }
}

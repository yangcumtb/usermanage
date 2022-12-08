package cn.hnsl.core;

import org.springframework.web.util.HtmlUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HtmlDecodeUtils {

    /**
     * html或前段转义字符替换，常规页面符号以及括号：& #40;  & #41等
     *
     * @param htmlStr
     * @return
     */
    public static String unescapeHtml(String htmlStr) {
        //可用表达式：&.{4}?;   &.+?;  &.*?;
        Pattern pattern = Pattern.compile("&.*?;");
        Matcher matcher = pattern.matcher(htmlStr);

        while (matcher.find()) {
            htmlStr = htmlStr.replaceFirst(matcher.group(), matcher.group().replaceAll(" ", ""));
        }

        return HtmlUtils.htmlUnescape(htmlStr);
    }
}

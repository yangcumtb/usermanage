package cn.hnsl.core.kaptcha;

import com.google.code.kaptcha.text.TextProducer;
import com.google.code.kaptcha.util.Configurable;

import java.util.Random;

public class TextCreator extends Configurable implements TextProducer {

    @Override
    public String getText() {
        int length = this.getConfig().getTextProducerCharLength();
        String ZiMu = "1234567890";
        String result = "";
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(ZiMu.length());
            char c = ZiMu.charAt(index);
            result += c;
        }
        return result;
    }
}

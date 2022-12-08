package cn.hnsl.core.kaptcha;

import com.google.code.kaptcha.GimpyEngine;
import com.google.code.kaptcha.util.Configurable;

import java.awt.image.BufferedImage;

public class NoWater extends Configurable implements GimpyEngine {
    public NoWater() {
    }

    public BufferedImage getDistortedImage(BufferedImage baseImage) {
        return baseImage;
    }
}

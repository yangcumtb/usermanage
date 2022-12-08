package cn.hnsl.core.kaptcha;

import com.google.code.kaptcha.util.Configurable;

import java.awt.*;
import java.awt.font.FontRenderContext;
import java.awt.font.GlyphVector;
import java.awt.image.BufferedImage;

public class WordRenderer extends Configurable implements com.google.code.kaptcha.text.WordRenderer {
    @Override
    public BufferedImage renderWord(String word, int width, int height) {
        int fontSize = this.getConfig().getTextProducerFontSize();
        Font[] fonts = this.getConfig().getTextProducerFonts(fontSize);
        Color color = this.getConfig().getTextProducerFontColor();
        int charSpace = this.getConfig().getTextProducerCharSpace();
        BufferedImage image = new BufferedImage(width, height, 2);
        Graphics2D g2D = image.createGraphics();
        g2D.setColor(color);
        FontRenderContext frc = g2D.getFontRenderContext();

        int startPosY = (height - fontSize) / 5 + fontSize;
        char[] wordChars = word.toCharArray();
        Font[] chosenFonts = new Font[wordChars.length];
        int[] charWidths = new int[wordChars.length];

        int startPosX;
        for(startPosX = 0; startPosX < wordChars.length; ++startPosX) {
            chosenFonts[startPosX] = fonts[0];
            char[] charToDraw = new char[]{wordChars[startPosX]};
            GlyphVector gv = chosenFonts[startPosX].createGlyphVector(frc, charToDraw);
            charWidths[startPosX] = (int)gv.getVisualBounds().getWidth();
        }

        startPosX = 15;

        for(int i = 0; i < wordChars.length; ++i) {
            g2D.setFont(chosenFonts[i]);
            char[] charToDraw = new char[]{wordChars[i]};
            g2D.drawChars(charToDraw, 0, charToDraw.length, startPosX, startPosY);
            startPosX = startPosX + charWidths[i] + charSpace;
        }

        return image;

    }
}

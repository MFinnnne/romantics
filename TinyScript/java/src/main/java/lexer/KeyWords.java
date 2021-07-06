package lexer;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/7/7 0:04
 **/
public class KeyWords {
    static String[] keywords = {
            "var",
            "if",
            "else",
            "for",
            "while",
            "break",
            "func",
            "return",
    };

    static Set<String> set = new HashSet<>(Arrays.asList(keywords));

    public static boolean isKeyword(String word) {
        return set.contains(word);
    }
}

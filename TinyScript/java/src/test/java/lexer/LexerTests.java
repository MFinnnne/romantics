package lexer;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/16 23:02
 **/
public class LexerTests {

    @Test
    public void testExpression() throws LexicalException {
        Lexer lexer = new Lexer();
        var source = "(a+b)^100.12==+100-20";
        ArrayList<Token> tokens = lexer.analyse(source.chars().mapToObj(x -> (char) x));
        Assertions.assertEquals(11, tokens.size());
    }
}

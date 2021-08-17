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

    void assertToken(Token token, String value, TokenType type) {
        Assertions.assertEquals(value, token.getValue());
        Assertions.assertEquals(type, token.getType());
    }

    @Test
    public void testExpression() throws LexicalException {
        Lexer lexer = new Lexer();
        var source = "(a+b)^100.12==+100-20";
        ArrayList<Token> tokens = lexer.analyse(source.chars().mapToObj(x -> (char) x));
        Assertions.assertEquals(11, tokens.size());
        assertToken(tokens.get(0),"(",TokenType.BRACKET);
        assertToken(tokens.get(1),"a",TokenType.VARIABLE);
        assertToken(tokens.get(2),"+",TokenType.OPERATOR);
        assertToken(tokens.get(3),"b",TokenType.VARIABLE);
        assertToken(tokens.get(4),")",TokenType.BRACKET);
        assertToken(tokens.get(5),"^",TokenType.OPERATOR);
        assertToken(tokens.get(6),"100.12",TokenType.FLOAT);
        assertToken(tokens.get(7),"==",TokenType.OPERATOR);
        assertToken(tokens.get(8),"+100",TokenType.INTEGER);
        assertToken(tokens.get(9),"-",TokenType.OPERATOR);
        assertToken(tokens.get(10),"20",TokenType.INTEGER);
    }
}

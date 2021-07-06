package lexer;

import commons.PeekIterator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/7/7 0:09
 **/
class TokenTest {

    @Test
    public void testVarOrKeyword() {
        var it1 = new PeekIterator<Character>("if abc".chars().mapToObj(x -> (char) x));
        var it2 = new PeekIterator<Character>("true abc".chars().mapToObj(x -> (char) x));
        Token token1 = Token.makeVarOrKeyword(it1);

        Token token2 = Token.makeVarOrKeyword(it2);

        assertEquals(token1.getType(),TokenType.KEYWORD);
        assertEquals(token1.getValue(),"if");
        assertEquals(token2.getType(),TokenType.BOOLEAN);
        assertEquals(token2.getValue(),"true");


        var it3 = new PeekIterator<Character>("abc".chars().mapToObj(x -> (char) x));

        Token token3 = Token.makeVarOrKeyword(it3);
        assertEquals(token3.getType(),TokenType.VARIABLE);
        assertEquals(token3.getValue(),"abc");

    }

}
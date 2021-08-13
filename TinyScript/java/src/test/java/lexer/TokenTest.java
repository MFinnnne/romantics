package lexer;

import commons.PeekIterator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/7/7 0:09
 **/
class TokenTest {

    @Test
    public void testVarOrKeyword() {
        var it1 = new PeekIterator<>("if abc".chars().mapToObj(x -> (char) x));
        var it2 = new PeekIterator<>("true abc".chars().mapToObj(x -> (char) x));
        Token token1 = Token.makeVarOrKeyword(it1);

        Token token2 = Token.makeVarOrKeyword(it2);

        assertEquals(token1.getType(), TokenType.KEYWORD);
        assertEquals(token1.getValue(), "if");
        assertEquals(token2.getType(), TokenType.BOOLEAN);
        assertEquals(token2.getValue(), "true");


        var it3 = new PeekIterator<>("abc".chars().mapToObj(x -> (char) x));

        Token token3 = Token.makeVarOrKeyword(it3);
        assertEquals(token3.getType(), TokenType.VARIABLE);
        assertEquals(token3.getValue(), "abc");

    }

    @Test
    public void makeString() throws LexicalException {
        String[] tests = {
                "\"123\"",
                "'123'",
        };

        List<PeekIterator<Character>> collect = Stream.of(tests).map((item -> new PeekIterator<>(item.chars().mapToObj(x -> (char) x)))).collect(Collectors.toList());
        for (PeekIterator<Character> characterPeekIterator : collect) {
            Token token = Token.makeString(characterPeekIterator);
            Assertions.assertEquals(token.getValue(), "123");
        }
    }

    @Test
    public void testMakeOp() throws LexicalException {
        String[] tests = {
                "+ xx",
                "++mm",
                "- xx",
                "--mm",
                "/=g",
                "= 1",
                "==sad",
                "&=sada",
                "&yy",
                "||xxs",
                "^=11",
                "%7"

        };
        int i = 0;
        String[] results = {"+", "++", "-", "--", "/=", "=", "==", "&=", "&", "||", "^=", "%"};
        for (String test : tests) {
            PeekIterator<Character> iterator = new PeekIterator<>(test.chars().mapToObj(x -> (char) x), (char) 0);
            Token token = Token.makeOp(iterator);
            Assertions.assertEquals(token.getValue(), results[i++]);
            Assertions.assertEquals(token.getType(), TokenType.OPERATOR);
        }
    }

    @Test
    void testMakeNumber() throws LexicalException {
        String[] tests = {
                "0000xx",
                "0.21d1",
                "021dew",
                "2.11sd",
                "21sa",
                "-1xx",
                "+1a",
                "1231.1231x"
        };
        String[] results = {"0", "0.21", "21", "2.11", "21", "-1", "+1", "1231.1231"};
        int i = 0;
        for (String test : tests) {
            PeekIterator<Character> iterator = new PeekIterator<>(test.chars().mapToObj(x -> (char) x), (char) 0);
            Token token = Token.makeNumber(iterator);
            Assertions.assertEquals(token.getValue(), results[i++]);

        }
    }
}
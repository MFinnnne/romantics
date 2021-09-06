package paser.ast;

import lexer.Lexer;
import lexer.LexicalException;
import org.junit.jupiter.api.Test;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/9/3 0:30
 **/
class SimpleParserTest {

    @Test
    void test() throws LexicalException, ParseException {
        Stream<Character> source = "1+2+3+4".chars().mapToObj(x -> (char) x);
        Lexer lexer = new Lexer();
        PeekTokenIterator iterator = new PeekTokenIterator(lexer.analyse(source).stream());
        ASTNode expr = SimpleParser.parse(iterator);
        assertEquals(2, expr.getChildren().size());
        Scalar v1 = (Scalar) expr.getChildren(0);
        assertEquals("1", v1.getLexeme().getValue());
        assertEquals("+",expr.getLexeme().getValue());

        var e2 = (Expr) expr.getChildren(1);
        var v2 = (Scalar) e2.getChildren(0);
        assertEquals("2", v2.getLexeme().getValue());
        assertEquals("+", e2.getLexeme().getValue());

        var e3 = (Expr) e2.getChildren(1);
        var v3 = (Scalar) e3.getChildren(0);
        assertEquals("3", v3.getLexeme().getValue());
        assertEquals("+", e3.getLexeme().getValue());

        Scalar v4 = (Scalar) e3.getChildren(1);
        assertEquals("4", v4.getLexeme().getValue());

    }
}
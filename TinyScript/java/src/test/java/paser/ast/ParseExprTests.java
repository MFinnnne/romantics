package paser.ast;

import jdk.jshell.spi.ExecutionControl;
import lexer.Lexer;
import lexer.LexicalException;
import lexer.Token;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import paser.MySimpleParser;
import paser.util.ParseException;
import paser.util.ParserUtils;
import paser.util.PeekTokenIterator;

import java.util.ArrayList;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/12 0:45
 **/
class ParseExprTests {
    @Test
    void simple() throws LexicalException, ParseException, ExecutionControl.NotImplementedException {
        var expr = createExpr("1*1+1*1");
        Assertions.assertEquals("1 1 1 + +", ParserUtils.toPostfixExpression(expr));
    }

    private ASTNode createExpr(String src) throws LexicalException, ParseException {
        Lexer lexer = new Lexer();
        ArrayList<Token> tokens = lexer.analyse(src.chars().mapToObj(x -> (char) x));
        var tokenIt = new PeekTokenIterator(tokens.stream());
        return Expr.parse(tokenIt);
    }


    // 我终于写出来了
    private ASTNode myCreateExpr(String src) throws LexicalException, ParseException {
        Lexer lexer = new Lexer();
        ArrayList<Token> tokens = lexer.analyse(src.chars().mapToObj(x -> (char) x));
        var tokenIt = new PeekTokenIterator(tokens.stream());
        return MySimpleParser.parse(tokenIt);
    }

    @Test
    void mySimpleParser() throws LexicalException, ParseException, ExecutionControl.NotImplementedException {
        var expr = myCreateExpr("1*1+1*1");
        Assertions.assertEquals("1 1 * 1 1 * +", ParserUtils.toPostfixExpression(expr));
    }
}

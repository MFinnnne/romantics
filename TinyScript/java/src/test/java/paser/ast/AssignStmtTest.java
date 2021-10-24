package paser.ast;

import jdk.jshell.spi.ExecutionControl;
import lexer.Lexer;
import lexer.LexicalException;
import lexer.Token;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import paser.util.ParseException;
import paser.util.ParserUtils;
import paser.util.PeekTokenIterator;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/25 0:02
 **/
class AssignStmtTest {

    private PeekTokenIterator createTokenIt(String src) throws LexicalException {
        Lexer lexer = new Lexer();
        ArrayList<Token> tokens = lexer.analyse(src.chars().mapToObj(x -> (char) x));
        return new PeekTokenIterator(tokens.stream());
    }

    @Test
    void parse() throws LexicalException, ExecutionControl.NotImplementedException, ParseException {
        PeekTokenIterator tokenIt = createTokenIt("i=100+1");
        ASTNode parse = AssignStmt.parse(null,tokenIt);
        Assertions.assertEquals("i 100 1 + =", ParserUtils.toPostfixExpression(parse));

    }
}
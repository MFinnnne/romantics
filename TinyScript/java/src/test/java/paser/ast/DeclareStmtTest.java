package paser.ast;

import jdk.jshell.spi.ExecutionControl;
import lexer.Lexer;
import lexer.LexicalException;
import lexer.Token;
import lexer.TokenType;
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
 * @date 2021/10/24 23:43
 **/
class DeclareStmtTest {

    private PeekTokenIterator createTokenIt(String src) throws LexicalException {
        Lexer lexer = new Lexer();
        ArrayList<Token> tokens = lexer.analyse(src.chars().mapToObj(x -> (char) x));
        return new PeekTokenIterator(tokens.stream());
    }

    @Test
    void parse() throws LexicalException, ParseException, ExecutionControl.NotImplementedException {
        PeekTokenIterator tokenIt = createTokenIt("var i=100*2");
        ASTNode parse = DeclareStmt.parse(null, tokenIt);
        Assertions.assertEquals("i 100 2 * =", ParserUtils.toPostfixExpression(parse));
    }
}
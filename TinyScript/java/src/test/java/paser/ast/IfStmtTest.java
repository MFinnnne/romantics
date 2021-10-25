package paser.ast;

import lexer.Lexer;
import lexer.LexicalException;
import lexer.Token;
import org.junit.jupiter.api.Test;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/26 0:07
 **/
class IfStmtTest {

    private PeekTokenIterator createTokenIt(String src) throws LexicalException {
        Lexer lexer = new Lexer();
        ArrayList<Token> tokens = lexer.analyse(src.chars().mapToObj(x -> (char) x));
        return new PeekTokenIterator(tokens.stream());
    }

    @Test
    void IfStmt() throws LexicalException, ParseException {
        PeekTokenIterator tokenIt = createTokenIt("if(a){\n" +
                "a=1\n" +
                "}");
        ASTNode parse = IfStmt.parse(null,tokenIt);
        parse.print(parse);
    }
}
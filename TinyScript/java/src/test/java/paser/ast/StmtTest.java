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

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/26 0:07
 **/
class StmtTest {

    void assertToken(Token token, String value, TokenType type) {
        Assertions.assertEquals(value, token.getValue());
        Assertions.assertEquals(type, token.getType());
    }


    private PeekTokenIterator createTokenIt(String src) throws LexicalException {
        Lexer lexer = new Lexer();
        ArrayList<Token> tokens = lexer.analyse(src.chars().mapToObj(x -> (char) x));
        return new PeekTokenIterator(tokens.stream());
    }

    @Test
    void IfStmt() throws LexicalException, ParseException, ExecutionControl.NotImplementedException {
        PeekTokenIterator tokenIt = createTokenIt("if(a){\n" +
                "a=1\n" +
                "}");
        ASTNode parse = IfStmt.parse(null, tokenIt);
        parse.print(0);
        Assertions.assertEquals("a a 1 = if", ParserUtils.toPostfixExpression(parse));
    }

    @Test
    void IfElseStmt() throws LexicalException, ParseException, ExecutionControl.NotImplementedException {
        PeekTokenIterator tokenIt = createTokenIt("if(a){\n" +
                "a=1\n" +
                "} else {\n" +
                "a=2\n" +
                "a=a*3" +
                "}");
        ASTNode parse = IfStmt.parse(null, tokenIt);
        parse.print(0);
        assertToken(parse.getLexeme(), "if", TokenType.KEYWORD);
        ASTNode children = parse.getChildren(0);
        assertToken(children.getLexeme(), "a", TokenType.VARIABLE);
        ASTNode children1 = parse.getChildren(1);
        Assertions.assertEquals(children1.getLabel(), "block");

        ASTNode assign = children1.getChildren(0);
        assertToken(assign.getLexeme(), "=", TokenType.OPERATOR);

        ASTNode children2 = parse.getChildren(2);
        Assertions.assertEquals(children2.getLabel(), "block");

        ASTNode elseAssign1 = children2.getChildren(0);
        assertToken(elseAssign1.getLexeme(), "=", TokenType.OPERATOR);

        ASTNode elseAssign2 = children2.getChildren(1);
        assertToken(elseAssign2.getLexeme(), "=", TokenType.OPERATOR);
    }

    @Test
    void function() throws LexicalException, FileNotFoundException, UnsupportedEncodingException, ParseException {
        var tokens = Lexer.fromFile("./example/function.ts");
        var functionStmt = (FunctionDefineStmt) Stmt.parseStmt(null, new PeekTokenIterator(tokens.stream()));
        functionStmt.print(0);
        ASTNode args = functionStmt.getArgs();
        Assertions.assertEquals("a", args.getChildren(0).getLexeme().getValue());
        Assertions.assertEquals("b", args.getChildren(1).getLexeme().getValue());
        String funcType = functionStmt.getFuncType();
        Assertions.assertEquals(funcType, "int");
        Variable variable = functionStmt.getFunctionVariable();
        Assertions.assertEquals(variable.getLexeme().getValue(), "add");
        Block block = functionStmt.getBlock();
        assertTrue(block.getChildren(0) instanceof ReturnStmt);
    }


    @Test
    void recursion() throws LexicalException, FileNotFoundException, UnsupportedEncodingException, ParseException {
        var tokens = Lexer.fromFile("./example/recursion.ts");
        var functionStmt = (FunctionDefineStmt) Stmt.parseStmt(null, new PeekTokenIterator(tokens.stream()));
        functionStmt.print(0);
        String s = ParserUtils.toBFSString(functionStmt, 5);
        Assertions.assertEquals("function fact args block n", s);
        Assertions.assertEquals("args n", ParserUtils.toBFSString(functionStmt.getArgs(),2));
        Assertions.assertEquals("block if return", ParserUtils.toBFSString(functionStmt.getBlock(),3));
    }
}
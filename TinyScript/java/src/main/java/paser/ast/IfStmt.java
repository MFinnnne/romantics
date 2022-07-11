package paser.ast;

import lexer.Token;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:21
 **/
public class IfStmt extends Stmt {
    protected IfStmt(ASTNode parent) {
        super( ASTNodeTypes.IF_STMT, "if");
    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        Token token = it.nextMatch("if");
        it.nextMatch("(");
        IfStmt ifStmt = new IfStmt(parent);
        ifStmt.setLexeme(token);
        ASTNode expr = Expr.parse(it);
        ifStmt.addChild(expr);
        it.nextMatch(")");
        ASTNode block = Block.parse(parent, it);
        ifStmt.addChild(block);
        ASTNode tail = tail(parent, it);
        if (tail != null) {
            ifStmt.addChild(tail);
        }
        return ifStmt;
    }

    public static ASTNode tail(ASTNode parent, PeekTokenIterator it) throws ParseException {
        if (!it.hasNext() || !it.peek().getValue().equals("else")) {
            return null;
        }
        it.nextMatch("else");
        Token lookahead = it.peek();
        if (lookahead.getValue().equals("{")) {
            return Block.parse(parent, it);
        }
        if (lookahead.getValue().equals("if")){
            return parse(parent, it);
        }
        return null;
    }
}

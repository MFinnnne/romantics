package paser.ast;

import lexer.Token;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/28 23:43
 **/
public class CallStmt extends Stmt {

    protected CallStmt(ASTNode parent) {
        super(parent, ASTNodeTypes.IF_STMT, "call");
    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        CallStmt callStmt = new CallStmt(parent);
        it.nextMatch("(");
        ASTNode node = Expr.parse(it);
        callStmt.addChild(node);
        it.nextMatch(")");
        return callStmt;
    }
}

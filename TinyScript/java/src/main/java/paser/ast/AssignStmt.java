package paser.ast;

import lexer.Token;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:21
 **/
public class AssignStmt extends Stmt {
    protected AssignStmt() {
        super(ASTNodeTypes.ASSIGN_STMT, "assign");
    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        AssignStmt assignStmt = new AssignStmt();
        Token tkn = it.peek();
        ASTNode factor = Factor.parse(parent, it);
        if (factor == null || tkn.isScalar()) {
            throw new ParseException(tkn);
        }
        assignStmt.addChild(factor);
        Token token = it.nextMatch("=");
        ASTNode parse = Expr.parse(it);
        assignStmt.addChild(parse);
        assignStmt.setLexeme(token);
        return assignStmt;
    }
}

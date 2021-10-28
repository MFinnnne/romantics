package paser.ast;

import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/28 22:50
 **/
public class ReturnStmt extends Stmt {

    protected ReturnStmt(ASTNode parent) {
        super(parent,ASTNodeTypes.RETURN_STMT,"return");
    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        it.nextMatch("return");

        ReturnStmt returnStmt = new ReturnStmt(parent);
        ASTNode parse = Expr.parse(it);
        returnStmt.addChild(parse);
        return returnStmt;
    }

}

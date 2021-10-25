package paser.ast;

import lexer.Token;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

import java.util.List;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:19
 **/
public class Stmt extends ASTNode {

    protected Stmt(ASTNode parent, ASTNodeTypes types, String label) {
        super(parent, types, label);
    }

    public static ASTNode parseStmt(ASTNode parent, PeekTokenIterator it) throws ParseException {
        Token token = it.next();
        Token lookahead = it.peek();
        it.putBack();

        if (token.isVariable() && "=".equals(lookahead.getValue())) {
            return AssignStmt.parse(parent, it);
        } else if ("var".equals(token.getValue())) {
            return DeclareStmt.parseStmt(parent, it);
        }
        return null;
    }


}

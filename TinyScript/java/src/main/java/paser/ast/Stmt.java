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

    protected Stmt(ASTNodeTypes types, String label) {
        super(types, label);
    }

    public static ASTNode parseStmt(ASTNode parent, PeekTokenIterator it) throws ParseException {
        Token token = it.next();
        Token lookahead = it.peek();
        it.putBack();

        if (token.isVariable() && "=".equals(lookahead.getValue())) {
            return AssignStmt.parse(parent, it);
        } else if ("var".equals(token.getValue())) {
            return DeclareStmt.parse(parent, it);
        } else if ("func".equals(token.getValue())) {
            return FunctionDefineStmt.parse(parent, it);
        }else if ("return".equals(token.getValue())){
            return ReturnStmt.parse(parent,it);
        }else if ("if".equals(token.getValue())){
            return IfStmt.parse(parent,it);
        }
        return null;
    }


}

package paser.ast;

import lexer.Token;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:22
 **/
public class DeclareStmt extends Stmt {
    protected DeclareStmt(ASTNode parent) {
        super(parent, ASTNodeTypes.DECLARE_STMT, "declare");
    }


    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        DeclareStmt declareStmt = new DeclareStmt(parent);
        it.nextMatch("var");
        Token tkn = it.peek();
        ASTNode factor = Factor.parse(parent, it);
        if (factor == null) {
            throw new ParseException(tkn);
        }
        declareStmt.addChild(factor);
        Token token = it.nextMatch("=");
        ASTNode parse = Expr.parse(it);
        declareStmt.addChild(parse);
        declareStmt.setLexeme(token);
        return declareStmt;
    }
}

package paser;

import lexer.Token;
import lexer.TokenType;
import paser.ast.ASTNode;
import paser.ast.ASTNodeTypes;
import paser.ast.Expr;
import paser.util.ExprHOF;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;
import paser.util.PriorityTable;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/19 0:32
 **/
public class MySimpleParser {

    static PriorityTable TABLE = new PriorityTable();

    private static ASTNode E(PeekTokenIterator it, int k) throws ParseException {
        if (k < TABLE.size() - 1) {
            return combine(it, () -> E(it, k), () -> E_(it, k + 1));
        } else {
            //最高优先级
            return null;
        }

    }


    private static ASTNode E_(PeekTokenIterator it, int k) throws ParseException {
        Token peek = it.next();
        String value = peek.getValue();
        if (TABLE.get(k).contains(value)) {
            Expr expr = new Expr(null, ASTNodeTypes.UNARY_EXPR, new Token(TokenType.OPERATOR, value));
            expr.addChild(combine(it, () -> E(it, k + 1), () -> E_(it, k)));
        }
        return null;
    }

    private static ASTNode combine(PeekTokenIterator it, ExprHOF aFunc, ExprHOF bFunc) throws ParseException {
        ASTNode a = aFunc.hoc();
        if (a == null) {
            return it.hasNext() ? bFunc.hoc() : null;
        }
        ASTNode b = it.hasNext() ? bFunc.hoc() : null;
        if (b == null) {
            return a;
        }
        Expr expr = new Expr(null, ASTNodeTypes.UNARY_EXPR, b.getLexeme());
        expr.addChild(a);
        expr.addChild(b.getChildren(0));
        return expr;
    }

}

package paser.ast;

import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/9/3 0:22
 **/
public class SimpleParser {
    public static  ASTNode parse(PeekTokenIterator it) throws ParseException {
        Expr expr = new Expr();
        Scalar scalar = new Scalar(expr,it);
        if (!it.hasNext()){
            return scalar;
        }
        expr.setLexeme(it.peek());
        it.nextMatch("+");
        expr.setLabel("+");
        expr.addChild(scalar);
        expr.setType(ASTNodeTypes.BINARY_EXPR);
        ASTNode rightNode = parse(it);
        expr.addChild(rightNode);
        return expr;
    }
}

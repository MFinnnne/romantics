package paser;

import lexer.Token;
import lexer.TokenType;
import paser.ast.*;
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
            return combine(it, () -> E(it, k+1), () -> E_(it, k));
        } else {
            //最高优先级
            return race(it,
                    () -> combine(it, () -> F(it), () -> E_(it, k)),
                    () -> combine(it, () -> U(it), () -> E_(it, k))
            );
        }

    }

    private static ASTNode race(PeekTokenIterator it, ExprHOF aFunc, ExprHOF bFunc) throws ParseException {
        if (!it.hasNext()) {
            return null;
        }
        ASTNode a = aFunc.hoc();
        if (a != null) {
            return a;
        }
        ASTNode b = it.hasNext() ? bFunc.hoc() : null;
        if (b != null) {
            return b;
        }
        return null;
    }

    private static ASTNode F(PeekTokenIterator it) {
        Token next = it.peek();
        if (next.isVariable()) {
            return new Variable(null, it);
        }
        if (next.isScalar()) {
            return new Scalar(null, it);
        }
        return null;

    }

    private static ASTNode U(PeekTokenIterator it) throws ParseException {
        Token next = it.peek();
        String value = next.getValue();

        if ("(".equals(value)) {
            it.nextMatch("(");
            ASTNode node = E(it, 0);
            it.nextMatch(")");
            return node;
        }
        if ("++".equals(value) || "--".equals(value) || "!".equals(value)) {
            it.next();
            Expr expr = new Expr(ASTNodeTypes.UNARY_EXPR, new Token(TokenType.OPERATOR, value));
            expr.addChild(E(it, 0));
            return expr;
        }
        return null;
    }


    private static ASTNode E_(PeekTokenIterator it, int k) throws ParseException {
        Token peek = it.peek();
        String value = peek.getValue();
        if (TABLE.get(k).contains(value)) {
            it.next();
            Expr expr = new Expr(ASTNodeTypes.BINARY_EXPR, new Token(TokenType.OPERATOR, value));
            expr.addChild(combine(it, () -> E(it, k + 1), () -> E_(it, k)));
            return expr;
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
        Expr expr = new Expr( ASTNodeTypes.BINARY_EXPR, b.getLexeme());
        expr.addChild(a);
        expr.addChild(b.getChildren(0));
        return expr;
    }

    public static ASTNode parse(PeekTokenIterator it) throws ParseException {
        return E(it, 0);
    }
}

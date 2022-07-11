package paser.ast;

import lexer.Token;
import paser.util.ExprHOF;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;
import paser.util.PriorityTable;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:20
 **/
public class Expr extends ASTNode {


    private static PriorityTable table = new PriorityTable();


    protected Expr() {
        super();
    }

    public Expr( ASTNodeTypes type, Token lexeme) {
        super();
        this.type = type;
        this.lexeme = lexeme;
        this.label = lexeme.getValue();
    }


    // left: E(k) -> E(k) op(k) E(k+1) | E(k+1)
    // right:
    // E(k) -> E(K+1)E_(k)
    //    var e = new Expr();e.left = E(k+1);e.op = op(K);e.right=E(k+1)E_(k)
    // E_(k)->op(k)E(k+1)E_(k)|ε
    //最高优先级处理
    //  E(t)->F E_(k)|U E_(k)
    //  E_(t)-> op(t) E(t)E_(t) | ε
    //
    public static ASTNode E(ASTNode parent, int k, PeekTokenIterator it) throws ParseException {
        if (k < table.size() - 1) {
            return combine(parent, it, () -> E(parent, k + 1, it), () -> E_(parent, k, it));
        } else {
            return race(it,
                    () -> combine(parent, it, () -> U(parent, it), () -> E_(parent, k, it)),
                    () -> combine(parent, it, () -> F(parent, it), () -> E_(parent, k, it))
            );
        }
    }

    public static ASTNode U(ASTNode parent, PeekTokenIterator it) throws ParseException {
        Token token = it.peek();
        String value = token.getValue();
        ASTNode expr = null;

        if ("(".equals(value)) {
            it.nextMatch("(");
            expr = E(parent, 0, it);
            it.nextMatch(")");
            return expr;
        } else if ("++".equals(value) || "--".equals(value) || "!".equals(value)) {
            var t = it.peek();
            it.nextMatch(value);
            Expr unaryExpr = new Expr(ASTNodeTypes.UNARY_EXPR, t);
            unaryExpr.addChild(E(unaryExpr, 0, it));
            return unaryExpr;
        }
        return null;
    }

    public static ASTNode F(ASTNode parent, PeekTokenIterator it) throws ParseException {
        ASTNode parse = Factor.parse(parent, it);
        Token lookahead = it.peek();
        if (parse instanceof  Variable && "(".equals(lookahead.getValue())){
            ASTNode node = CallStmt.parse(parent, it);
            parse.addChild(node);
        }
        return parse;
    }

    private static ASTNode race(PeekTokenIterator it, ExprHOF aFunc, ExprHOF bFunc) throws ParseException {
        if (!it.hasNext()) {
            return null;
        }
        var a = aFunc.hoc();
        if (a != null) {
            return a;
        }
        return bFunc.hoc();
    }

    private static ASTNode E_(ASTNode parent, int k, PeekTokenIterator it) throws ParseException {
        var token = it.peek();
        var value = token.getValue();

        if (table.get(k).contains(value)) {
            Expr expr = new Expr(ASTNodeTypes.BINARY_EXPR, it.nextMatch(value));
            expr.addChild(combine(parent, it,
                    () -> E(parent, k + 1, it),
                    () -> E_(parent, k, it)
            ));
            return expr;
        }
        return null;
    }


    private static ASTNode combine(ASTNode parent, PeekTokenIterator it, ExprHOF aFunc, ExprHOF bFunc) throws ParseException {
        var a = aFunc.hoc();
        if (a == null) {
            return it.hasNext() ? bFunc.hoc() : null;
        }
        var b = it.hasNext() ? bFunc.hoc() : null;
        if (b == null) {
            return a;
        }
        Expr expr = new Expr(ASTNodeTypes.BINARY_EXPR, b.lexeme);
        expr.addChild(a);
        expr.addChild(b.getChildren(0));
        return expr;
    }

    public static ASTNode parse(PeekTokenIterator tokenIt) throws ParseException {
        return E(null, 0, tokenIt);
    }
}

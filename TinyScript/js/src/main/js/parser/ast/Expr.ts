import ASTNode from "./ASTNode";
import PeekTokenIterator from "../PeekTokenIterator";
import {PriorityTable} from "./PriorityTable";
import Token from "../../lexer/Token";
import ASTNodeTypes from "./ASTNodeTypes";
import TokenType from "../../lexer/TokenType";
import Factor from "./Factor";

export default class Expr extends ASTNode {

    constructor(parent: ASTNode | null) {
        super(null, null);

    }

    static TABLE = new PriorityTable();


    private static E(it: PeekTokenIterator, k: number): ASTNode | null {
        if (k < Expr.TABLE.table.length - 1) {
            return Expr.combine(it, () => this.E(it, k + 1), () => this.E_(it, k))
        } else {
            return Expr.race(it,
                () => Expr.combine(it, () => Expr.F(it), () => Expr.E_(it, k)),
                () => Expr.combine(it, () => Expr.U(it), () => Expr.E_(it, k))
            );
        }
    }

    private static race(it: PeekTokenIterator, aFunc: () => ASTNode | null, bFunc: () => ASTNode | null): ASTNode | null {
        if (!it.hasNext()) {
            return null;
        }
        const a = aFunc();
        if (a !== null) {
            return a;
        }
        return it.hasNext() ? bFunc() : null;
    }

    private static F(it: PeekTokenIterator): ASTNode | null {
        return Factor.parse(it);
    }

    private static U(it: PeekTokenIterator): ASTNode | null {
        const peek = it.peek();
        if (peek == null) {
            return null;
        }
        const value = peek.value;
        if (value == "(") {
            it.nextMatch("(");
            const e = Expr.E(it, 0);
            it.nextMatch(")");
            return e;
        } else if (value === "++" || value === "--" || value === "!") {
            it.next();
            const e1 = Expr.E(it, 0);
            const expr = Expr.fromToken(ASTNodeTypes.UNARY_EXPR, new Token(TokenType.OPERATOR, value));
            const e2 = Expr.E(it, 0);
            if (e2 != null) {
                expr.addChild(e2);
            }
            return null;
        }
        return null;
    }

    private static combine(it: PeekTokenIterator, aFunc: () => ASTNode | null, bFunc: () => ASTNode | null): ASTNode | null {
        if (!it.hasNext()) {
            return null;
        }
        const a = aFunc();
        if (a == null) {
            return it.hasNext() ? bFunc() : null;
        }
        const b = it.hasNext() ? bFunc() : null;
        if (b == null) {
            return a;
        }
        const expr = Expr.fromToken(ASTNodeTypes.BINARY_EXPR, new Token(TokenType.OPERATOR, b.label));
        expr.addChild(a);
        expr.addChild(b.children[0]);
        return expr;
    }

    private static E_(it: PeekTokenIterator, k: number): ASTNode | null {
        const token = it.peek();
        const value = token?.value;
        if (value == null) {
            return null;
        }
        if (this.TABLE.table[k].includes(value)) {
            it.next();
            const expr = Expr.fromToken(ASTNodeTypes.UNARY_EXPR, new Token(TokenType.OPERATOR, value))
            const combine = this.combine(it, () => this.E(it, k + 1), () => this.E_(it, k));
            if (combine != null) {
                expr.addChild(combine);
            }
            return expr;
        }
        return null;
    }

    public static parse(it: PeekTokenIterator): ASTNode | null {
        return Expr.E(it, 0);
    }

    private static fromToken(type: ASTNodeTypes, token: Token): Expr {
        const expr = new Expr(null);
        expr.label = token.value;
        expr.lexeme = token;
        expr.type = type;
        return expr;
    }
}
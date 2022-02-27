import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";
import ParseException from "../ParseException";
import Expr from "./Expr";
import Block from "./Block";
import Token from "../../lexer/Token";

export default class IfStmt extends Stmt {

    constructor(types?: ASTNodeTypes | null, label?: string | null) {
        super(ASTNodeTypes.IF_STMT, "if");
    }

    public getExpr(): ASTNode {
        const children = this.getChildren(0);
        if (children == null) {
            throw new ParseException("unexpected expression");
        }
        return children;
    }

    public getBlock(): ASTNode {
        const children = this.getChildren(1);
        if (children == null) {
            throw new ParseException("unexpected block");
        }
        return children;
    }

    static parse(it: PeekTokenIterator): IfStmt {
        const ifStmt = new IfStmt();
        it.nextMatch("if");
        it.nextMatch("(");
        const expr = Expr.parse(it);
        if (expr == null) {
            throw new ParseException("unexpected expression");
        }
        ifStmt.addChild(expr);
        it.nextMatch(")");
        const block = Block.parse(it);
        ifStmt.addChild(block);
        const tail = IfStmt.parseTail(it);
        if (tail != null) {
            ifStmt.addChild(tail);
        }
        return ifStmt;
    }

    // Tail -> else {Block} | else IFStmt | ε
    static parseTail(it: PeekTokenIterator): ASTNode | null {
        if (!it.hasNext() || it.peek()?.value !== "else") {
            return null;
        }
        it.nextMatch("else");
        const lookahead = it.peek();
        if (lookahead?.value === "{") {
            return Block.parse(it);
        } else if (lookahead?.value === "if") {
            return IfStmt.parse(it);
        } else {
            throw new ParseException("unknown exception");
        }
    }
}
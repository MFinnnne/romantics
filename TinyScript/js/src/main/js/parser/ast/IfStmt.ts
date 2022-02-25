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

    static parse(it: PeekTokenIterator): ASTNode {
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
    static parseTail(it: PeekTokenIterator): ASTNode {
        if (!it.hasNext() || it.peek()?.value !== "else") {
            throw new ParseException("unknown exception");
        }
        it.nextMatch("else");
        const lookahead = it.peek();
        if (lookahead?.value === "{") {
            return Block.parse(it);
        } else if (lookahead?.value === "if") {
            return IfStmt.parse(it);
        }  else {
            throw new ParseException("unknown exception");
        }
    }
}
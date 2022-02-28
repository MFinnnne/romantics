import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";
import ParseException from "../ParseException";
import Expr from "./Expr";

export default class DeclareStmt extends Stmt {

    constructor() {
        super(ASTNodeTypes.DECLARE_STMT, "declare");
    }

    static parse(it: PeekTokenIterator): ASTNode {
        const {Factor} = require('./index')
        const stmt = new DeclareStmt();
        it.nextMatch("var");
        const peek = it.peek();
        const factor = Factor.parse(it);
        if (factor == null) {
            throw ParseException.fromToken(peek);
        }
        stmt.addChild(factor);
        const lexeme = it.nextMatch("=");
        const expr = Expr.parse(it);
        if (expr == null) {
            throw new ParseException("null exception")
        }
        stmt.addChild(expr);
        stmt.lexeme = lexeme;
        return stmt;
    }
}
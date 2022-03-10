import Stmt from "./Stmt";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";
import Expr from "./Expr";

export  default  class ReturnStmt extends Stmt {
    constructor() {
        super(ASTNodeTypes.RETURN_STMT, "return");
    }

    static parse(it:PeekTokenIterator):ReturnStmt{
        const {Expr} = require('./index')
        it.nextMatch("return");
        const stmt = new ReturnStmt();
        const parse = Stmt.parse(it) as Expr;
        stmt.addChild(parse);
        return stmt;
    }
}
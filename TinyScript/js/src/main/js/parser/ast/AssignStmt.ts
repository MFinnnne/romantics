import Stmt from "./Stmt";
import ASTNodeTypes from "./ASTNodeTypes";
import ParseException from "../ParseException";
import PeekTokenIterator from "../PeekTokenIterator";

export default class AssignStmt extends Stmt {

    constructor() {
        super(ASTNodeTypes.ASSIGN_STMT, "assign");
    }

    static parse(it: PeekTokenIterator):AssignStmt {
        const {Factor, Expr} = require('./index');
        const assign = new AssignStmt();
        const tkn = it.peek();
        const factor = Factor.parse(it);
        if (factor == null && tkn != null) {
            throw ParseException.fromToken(tkn);
        }
        assign.addChild(factor);
        const lexeme = it.nextMatch('=');
        const expr = Expr.parse(it);
        assign.addChild(expr);
        assign.lexeme = lexeme;
        return assign;
    }
}
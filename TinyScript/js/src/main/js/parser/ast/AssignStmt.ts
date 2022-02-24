import Stmt from "./Stmt";
import ASTNodeTypes from "./ASTNodeTypes";
import ParseException from "../ParseException";
import PeekTokenIterator from "../PeekTokenIterator";

export default class AssignStmt extends Stmt {

    constructor() {
        super(ASTNodeTypes.ASSIGN_STMT, "assign");
    }

    static parser(it: PeekTokenIterator):AssignStmt {
        const {Factor, Expr} = require('./index');
        const assign = new AssignStmt();
        const tkn = it.peek();
        const factor = Factor.parser(it);
        if (factor == null && tkn != null) {
            throw ParseException.fromToken(tkn);
        }
        assign.addChild(factor);
        const lexeme = it.nextMatch('=');
        const expr = Expr.parser(it);
        assign.addChild(expr);
        assign.lexeme = lexeme;
        return assign;
    }
}
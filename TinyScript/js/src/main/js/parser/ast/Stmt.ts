import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";
import ParseException from "../ParseException";

export default class Stmt extends ASTNode {

    constructor(types: ASTNodeTypes | null, label: string | null) {
        super(types, label);
    }


    static parse(it: PeekTokenIterator): Stmt | null {
        const {AssignStmt, DeclareStmt, IfStmt, Block, FunctionDefineStmt, ReturnStmt,Expr} = require('./index');
        if (!it.hasNext()) {
            throw new ParseException("unexpected token");
        }
        const tkn = it.next();
        const lookahead = it.peek();
        it.putBack();
        if (tkn?.isVariable() && lookahead?.value === '=') {
            return AssignStmt.parse(it);
        } else if (tkn?.value === "var") {
            return DeclareStmt.parse(it);
        } else if (tkn?.value === "if") {
            return IfStmt.parse(it);
        } else if (tkn?.value === "{") {
            return Block.parse(it);
        } else if (tkn?.value === "func") {
            return FunctionDefineStmt.parse(it);
        } else if (tkn?.value === "return") {
            return ReturnStmt.parse(it);
        } else {
            return Expr.parse(it);
        }
    }
}
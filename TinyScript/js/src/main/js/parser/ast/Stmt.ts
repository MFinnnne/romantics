import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";
import ParseException from "../ParseException";

export default class Stmt extends ASTNode {

    constructor(types: ASTNodeTypes | null, label: string | null) {
        super(ASTNodeTypes.FUNCTION_DECLARE_STMT, "func");
    }


    static parse(it: PeekTokenIterator): ASTNode | null {
        const {AssignStmt, DeclareStmt, IfStmt, Block} = require('./index');
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
        } else if (lookahead?.value === "{") {
            return Block.parse(it);
        }
        return null;
    }
}
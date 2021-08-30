import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class FunctionDefineStmt extends Stmt {

    constructor(parent: ASTNode, types: ASTNodeTypes | null, label: string | null) {
        super(parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, "function");
    }
}
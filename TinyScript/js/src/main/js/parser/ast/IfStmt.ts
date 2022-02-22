import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class IfStmt extends Stmt {

    constructor(types: ASTNodeTypes | null, label: string | null) {
        super( ASTNodeTypes.IF_STMT, "if");
    }
}
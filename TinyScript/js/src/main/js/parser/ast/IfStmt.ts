import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class IfStmt extends Stmt {

    constructor(parent: ASTNode, types: ASTNodeTypes | null, label: string | null) {
        super(parent, ASTNodeTypes.IF_STMT, "if");
    }
}
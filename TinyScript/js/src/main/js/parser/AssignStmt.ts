import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export  default  class AssignStmt extends Stmt{

    constructor(parent: ASTNode) {
        super(parent, ASTNodeTypes.ASSIGN_STMT, "assign");
    }
}
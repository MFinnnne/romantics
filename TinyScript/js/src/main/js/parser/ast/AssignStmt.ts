import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export  default  class AssignStmt extends Stmt{

    constructor() {
        super( ASTNodeTypes.ASSIGN_STMT, "assign");
    }
}
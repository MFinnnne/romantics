import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export  default  class ForStmt extends Stmt{

    constructor() {
        super(ASTNodeTypes.FOR_STMT ,"for" );
    }
}
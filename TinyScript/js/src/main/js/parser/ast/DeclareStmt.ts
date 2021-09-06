import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class DeclareStmt extends Stmt {

    constructor(parent: ASTNode, types: ASTNodeTypes | null, label: string | null) {
        super(parent, ASTNodeTypes.DECLARE_STMT, "declare");
    }
}
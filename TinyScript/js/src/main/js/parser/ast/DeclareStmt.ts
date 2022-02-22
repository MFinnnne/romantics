import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class DeclareStmt extends Stmt {

    constructor(types: ASTNodeTypes | null, label: string | null) {
        super(ASTNodeTypes.DECLARE_STMT, "declare");
    }
}
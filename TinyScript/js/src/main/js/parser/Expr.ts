import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

class Expr extends ASTNode{

    constructor(parent: ASTNode, types: ASTNodeTypes | null, label: string | null) {
        super(parent, types, label);
    }
}
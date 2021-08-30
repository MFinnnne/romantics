import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export  default  class Factor extends ASTNode{

    constructor(parent: ASTNode, types: ASTNodeTypes | null, label: string | null) {
        super(parent, types, label);
    }
}
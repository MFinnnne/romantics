import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class Expr extends ASTNode {

    constructor(parent: ASTNode | null) {
        super(parent, null, null);
    }
}
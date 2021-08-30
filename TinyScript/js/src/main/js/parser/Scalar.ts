import Factor from "./Factor";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

class Scalar extends Factor {

    constructor(parent: ASTNode) {
        super(parent, ASTNodeTypes.SCALAR, null);
    }
}
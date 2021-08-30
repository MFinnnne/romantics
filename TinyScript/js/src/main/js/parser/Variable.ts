import Factor from "./Factor";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class Variable extends Factor {

    constructor(parent: ASTNode) {
        super(parent, ASTNodeTypes.VARIABLE, null);
    }
}
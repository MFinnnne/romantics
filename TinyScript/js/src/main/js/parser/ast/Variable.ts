import Factor from "./Factor";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";

export default class Variable extends Factor {

    constructor(parent: ASTNode | null,it:PeekTokenIterator) {
        super(parent, it);
    }
}
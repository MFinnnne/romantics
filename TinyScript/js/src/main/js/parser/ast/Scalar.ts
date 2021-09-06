import Factor from "./Factor";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";

export default class Scalar extends Factor {

    constructor(parent: ASTNode, it: PeekTokenIterator) {
        super(parent, it);
    }
}
import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class Block extends Stmt {

    constructor(parent: ASTNode) {
        super(parent, ASTNodeTypes.BLOCK, "block");
    }
}
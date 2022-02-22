import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";

export default class Stmt extends ASTNode {

    constructor(types: ASTNodeTypes | null, label: string | null) {
        super(types, label);
    }
}
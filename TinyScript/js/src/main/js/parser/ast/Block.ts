import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";

export default class Block extends Stmt {

    constructor() {
        super(ASTNodeTypes.BLOCK, "block");
    }


    static parse(it: PeekTokenIterator): Block {
        it.nextMatch("{");
        const block = new Block();
        let stmt = null;
        while ((stmt = Stmt.parse(it)) != null) {
            block.addChild(stmt);
        }
        it.nextMatch("}");
        return block;
    }
}
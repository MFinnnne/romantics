package paser.ast;

import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:21
 **/
public class Block extends Stmt {
    protected Block(ASTNode parent) {
        super(ASTNodeTypes.BLOCK, "block");
    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        it.nextMatch("{");
        var block = new Block(parent);
        ASTNode stmt = null;
        while ((stmt = Stmt.parseStmt(parent, it)) != null) {
            block.addChild(stmt);
        }
        it.nextMatch("}");
        return block;
    }
}

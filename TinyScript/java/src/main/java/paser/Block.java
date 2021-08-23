package paser;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:21
 **/
public class Block extends Stmt {
    protected Block(ASTNode parent) {
        super(parent, ASTNodeTypes.BLOCK, "block");
    }
}

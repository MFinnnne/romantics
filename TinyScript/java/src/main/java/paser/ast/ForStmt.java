package paser.ast;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:22
 **/
public class ForStmt extends Stmt{
    protected ForStmt(ASTNode parent) {
        super(ASTNodeTypes.FOR_STMT,"for");
    }
}

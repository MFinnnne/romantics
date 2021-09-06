package paser.ast;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:21
 **/
public class IfStmt extends Stmt{
    protected IfStmt(ASTNode parent) {
        super(parent, ASTNodeTypes.IF_STMT,"if");
    }
}

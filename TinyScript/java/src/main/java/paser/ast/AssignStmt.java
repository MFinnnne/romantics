package paser.ast;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:21
 **/
public class AssignStmt extends Stmt{
    protected AssignStmt(ASTNode parent) {
        super(parent,ASTNodeTypes.ASSIGN_STMT,"assign");
    }
}

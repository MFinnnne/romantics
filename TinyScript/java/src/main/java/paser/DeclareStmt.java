package paser;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:22
 **/
public class DeclareStmt extends Stmt {
    protected DeclareStmt(ASTNode parent) {
        super(parent, ASTNodeTypes.DECLARE_STMT, "declare");
    }
}

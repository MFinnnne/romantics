package paser;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:22
 **/
public class FunctionDefineStmt extends Stmt {
    protected FunctionDefineStmt(ASTNode parent) {
        super(parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, "function");
    }
}

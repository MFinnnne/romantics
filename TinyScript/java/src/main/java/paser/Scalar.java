package paser;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:20
 **/
public class Scalar extends Factor{
    protected Scalar(ASTNode parent ) {
        super(parent, ASTNodeTypes.SCALAR, null);
    }
}

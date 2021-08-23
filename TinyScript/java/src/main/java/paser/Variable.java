package paser;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:20
 **/
public class Variable extends Factor {
    protected Variable(ASTNode parent) {
        super(parent, ASTNodeTypes.VARIABLE, null);
    }
}

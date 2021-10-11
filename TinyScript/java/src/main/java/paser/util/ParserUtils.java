package paser.util;

import jdk.jshell.spi.ExecutionControl;
import paser.ast.ASTNode;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/12 0:39
 **/
public class ParserUtils {

    public static String toPostfixExpression(ASTNode node) throws ExecutionControl.NotImplementedException {
        String leftStr = "";
        String rightStr = "";
        switch (node.getType()) {
            case BINARY_EXPR:
                leftStr = toPostfixExpression(node.getChildren(0));
                rightStr = toPostfixExpression(node.getChildren(1));
                return leftStr + " " + rightStr + " " + node.getLexeme().getValue();
            case VARIABLE:
            case SCALAR:
                return node.getLexeme().getValue();
            default:
                break;
        }
        throw new ExecutionControl.NotImplementedException("未实现");
    }
}

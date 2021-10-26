package paser.util;

import jdk.jshell.spi.ExecutionControl;
import paser.ast.ASTNode;
import paser.ast.Factor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/12 0:39
 **/
public class ParserUtils {

    public static String toPostfixExpression(ASTNode node) throws ExecutionControl.NotImplementedException {
        if (node instanceof Factor) {
            return node.getLexeme().getValue();
        }
        List<String> ptr = new ArrayList<>();
        for (ASTNode child : node.getChildren()) {
            String s = toPostfixExpression(child);
            ptr.add(s);
        }
        String s = node.getLexeme() != null ? node.getLexeme().getValue() : "";
        return String.join(" ", ptr) +s;
    }
}

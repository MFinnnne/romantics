package paser.util;

import jdk.jshell.spi.ExecutionControl;
import paser.ast.ASTNode;
import paser.ast.Factor;

import java.util.ArrayList;
import java.util.LinkedList;
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
        return String.join(" ", ptr) + s;
    }

    public static String toBFSString(ASTNode root, int max) {
        var queue = new LinkedList<ASTNode>();
        var list = new ArrayList<String>();
        queue.add(root);
        int c = 0;
        while (queue.size() > 0 && c++ < max) {
            var node = queue.poll();
            list.add(node.getLabel());
            for (ASTNode child : node.getChildren()) {
                queue.add(child);
            }
        }
        return String.join(" ", list);
    }
}

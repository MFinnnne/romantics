package paser.ast;

import lexer.Token;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/10/27 23:34
 **/
public class FunctionArgs extends ASTNode {
    public FunctionArgs(ASTNode parent) {
        super(parent);
        this.label = "args";
    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        FunctionArgs functionArgs = new FunctionArgs(parent);

        while (it.peek().isType()) {
            Token type = it.next();
            Variable var = (Variable) Factor.parse(parent, it);
            assert var != null;
            var.setTypeLexeme(type);
            functionArgs.addChild(var);
            if (!it.peek().getValue().equals(")")) {
                it.nextMatch(",");
            }
        }

        return functionArgs;
    }
}

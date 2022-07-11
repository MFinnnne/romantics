package paser.ast;

import lexer.Token;
import lexer.TokenType;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:20
 **/
public class Factor extends ASTNode {
    protected Factor(ASTNode parent, PeekTokenIterator it) {
        super();
        Token next = it.next();
        TokenType type = next.getType();
        if (type == TokenType.VARIABLE) {
            this.type = ASTNodeTypes.VARIABLE;
        } else {
            this.type = ASTNodeTypes.SCALAR;
        }
        this.label = next.getValue();
        this.lexeme = next;

    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) {

        Token next = it.peek();
        if (next.isVariable()) {
            return new Variable(parent, it);
        } else if (next.isScalar()) {
            return new Scalar(parent, it);
        }
        return null;
    }
}

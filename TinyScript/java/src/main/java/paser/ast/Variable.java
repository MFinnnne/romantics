package paser.ast;

import lexer.Token;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:20
 **/
public class Variable extends Factor {

    private Token typeLexeme = null;

    public Variable(ASTNode parent, PeekTokenIterator it) {
        super(parent, it);
    }

    public Token getTypeLexeme() {
        return typeLexeme;
    }

    public void setTypeLexeme(Token typeLexeme) {
        this.typeLexeme = typeLexeme;
    }
}

package paser.ast;

import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:20
 **/
public class Variable extends Factor {
    public Variable(ASTNode parent, PeekTokenIterator it) {
        super(parent, it);
    }
}

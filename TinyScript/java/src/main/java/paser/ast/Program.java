package paser.ast;

import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:21
 **/
public class Program extends Block {
    protected Program(ASTNode parent) {
        super(parent);
    }


    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        var block = new Program(parent);
        ASTNode stmt = null;
        while ((stmt = Stmt.parseStmt(parent, it)) != null) {
            block.addChild(stmt);
        }
        return block;
    }
}

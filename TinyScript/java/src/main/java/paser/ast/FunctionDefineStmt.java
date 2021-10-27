package paser.ast;

import lexer.KeyWords;
import lexer.Token;
import paser.util.ParseException;
import paser.util.PeekTokenIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:22
 **/
public class FunctionDefineStmt extends Stmt {
    protected FunctionDefineStmt(ASTNode parent) {
        super(parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, "function");
    }

    public static ASTNode parse(ASTNode parent, PeekTokenIterator it) throws ParseException {
        it.nextMatch("func");
        FunctionDefineStmt functionDefineStmt = new FunctionDefineStmt(parent);
        Token peek = it.peek();
        functionDefineStmt.setLexeme(peek);
        Variable var = (Variable) Factor.parse(parent, it);
        functionDefineStmt.addChild(var);
        it.nextMatch("(");
        ASTNode parse = FunctionArgs.parse(parent, it);
        functionDefineStmt.addChild(parse);
        it.nextMatch(")");
        Token returnType = it.next();
        if (!returnType.isType()) {
            throw new ParseException(returnType);
        }
        assert var != null;
        var.setTypeLexeme(returnType);
        ASTNode block = Block.parse(parent, it);
        functionDefineStmt.addChild(block);
        return functionDefineStmt;
    }

    public ASTNode getArgs() {
        return this.getChildren(1);
    }

    public Variable getFunctionVariable() {
        return (Variable) this.getChildren(0);
    }

    public String getFuncType() {
        return this.getFunctionVariable().getTypeLexeme().getValue();
    }

    public Block getBlock() {
        return (Block) this.getChildren(2);
    }
}

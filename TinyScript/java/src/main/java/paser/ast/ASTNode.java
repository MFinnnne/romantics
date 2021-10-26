package paser.ast;

import lexer.Token;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * astnode
 *
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 0:19
 **/
public abstract class ASTNode {


    /**
     * 孩子们
     */
    protected ArrayList<ASTNode> children = new ArrayList<>();
    /**
     * 父
     */
    protected ASTNode parent;

    /**
     * 语义
     */
    protected Token lexeme;

    /**
     * 标签
     */
    protected String label;

    /**
     * 类型
     */
    protected ASTNodeTypes type;


    public void setLabel(String label) {
        this.label = label;
    }

    /**
     * astnode
     *
     * @param parent 父
     */
    protected ASTNode(ASTNode parent, ASTNodeTypes type, String label) {
        this.parent = parent;
        this.type = type;
        this.label = label;
    }

    protected ASTNode(ASTNode parent) {
        this.parent = parent;
    }


    public void setLexeme(Token lexeme) {
        this.lexeme = lexeme;
    }

    /**
     * 根据索引获取节点
     *
     * @param index 指数
     * @return {@code ASTNode}
     */
    public ASTNode getChildren(int index) {
        return children.get(index);
    }

    /**
     * 添加的孩子
     *
     * @param node 节点
     */
    public void addChild(ASTNode node) {
        children.add(node);
    }

    /**
     * 得到语义
     *
     * @return {@code Token}
     */
    public Token getLexeme() {
        return lexeme;
    }

    /**
     * 让孩子
     *
     * @return {@code ArrayList<ASTNode>}
     */
    public List<ASTNode> getChildren() {
        return children;
    }

    public void setType(ASTNodeTypes type) {
        this.type = type;
    }

    public ASTNodeTypes getType() {
        return type;
    }

    public String getLabel() {
        return label;
    }

    protected void print(int intent) {
        if (intent == 0) {
            System.out.println("print:" + this);
        }
        for (int i = 0; i < intent * 2; i++) {
            System.out.printf(" ");
        }
        System.out.println(label);
        for (ASTNode child : children) {
            child.print(intent + 1);
        }

    }
}

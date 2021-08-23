package paser;

import lexer.Token;

import java.util.ArrayList;
import java.util.List;

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
    protected ArrayList<ASTNode> children;
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
    protected ASTNodeTypes types;

    /**
     * astnode
     *
     * @param parent 父
     */
    protected ASTNode(ASTNode parent, ASTNodeTypes types, String label) {
        this.parent = parent;
        this.types = types;
        this.label = label;
    }

    protected ASTNode(ASTNode parent) {
        this.parent = parent;
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
}

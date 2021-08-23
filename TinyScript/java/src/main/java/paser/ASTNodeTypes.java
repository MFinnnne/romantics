package paser;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/8/23 23:54
 **/
public enum ASTNodeTypes {
    /**
     * 块
     */
    BLOCK,
    /**
     * 二元表示
     */
    BINARY_EXPR,
    /**
     * 一元表达式
     */
    UNARY_EXPR,
    /**
     * 变量
     */
    VARIABLE,
    /**
     * 标量
     */
    SCALAR,
    /**
     * 如果语句
     */
    IF_STMT,
    /**
     * while语句
     */
    WHILE_STMT,
    /**
     * for语句
     */
    FOR_STMT,
    /**
     * 赋值语句
     */
    ASSIGN_STMT,
    /**
     * 函数声明语句
     */
    FUNCTION_DECLARE_STMT,

    /**
     * 申报的支撑
     */
    DECLARE_STMT;
}

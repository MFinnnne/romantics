package lexer;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/6/29 0:35
 **/
public enum TokenType {
    // 关键字
    KEYWORD,
    // 变量
    VARIABLE,
    // 操作符
    OPERATOR,
    // 括号
    BRACKET,
    // 字符串
    STRING,
    // 浮点数
    FLOAT,
    // 布尔型
    BOOLEAN,
    // 整型
    INTEGER
}

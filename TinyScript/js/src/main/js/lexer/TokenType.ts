/*
 * @Author: MFine
 * @Date: 2021-06-29 00:49:31
 * @LastEditTime: 2021-06-29 01:08:43
 * @LastEditors: MFine
 * @Description:
 */
enum TokenType {
    // 关键字
    KEYWORD = 0,
    // 变量
    VARIABLE = 1,
    // 操作符
    OPERATOR = 2,
    // 括号
    BRACKET = 3,
    // 整型
    INTEGER = 4,
    // 浮点数
    FLOAT = 5,
    // 布尔型
    BOOLEAN = 6,
    // 字符串
    STRING = 7,
}

export default TokenType;

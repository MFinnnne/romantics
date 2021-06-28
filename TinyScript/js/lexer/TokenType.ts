/*
 * @Author: MFine
 * @Date: 2021-06-29 00:49:31
 * @LastEditTime: 2021-06-29 01:08:43
 * @LastEditors: MFine
 * @Description:
 */
enum TokenType {
	// 关键字
	KEYWORD,
	// 变量
	VARIABLE,
	// 操作符
	OPERATOR,
	// 括号
	BRACKET,
	// 整型
	INTEGER,
	// 浮点数
	FLOAT,
	// 布尔型
	BOOLEAN,
	// 字符串
	STRING,
}
export default TokenType;

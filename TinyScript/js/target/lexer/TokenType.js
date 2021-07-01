"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: MFine
 * @Date: 2021-06-29 00:49:31
 * @LastEditTime: 2021-06-29 01:08:43
 * @LastEditors: MFine
 * @Description:
 */
var TokenType;
(function (TokenType) {
    // 关键字
    TokenType[TokenType["KEYWORD"] = 0] = "KEYWORD";
    // 变量
    TokenType[TokenType["VARIABLE"] = 1] = "VARIABLE";
    // 操作符
    TokenType[TokenType["OPERATOR"] = 2] = "OPERATOR";
    // 括号
    TokenType[TokenType["BRACKET"] = 3] = "BRACKET";
    // 整型
    TokenType[TokenType["INTEGER"] = 4] = "INTEGER";
    // 浮点数
    TokenType[TokenType["FLOAT"] = 5] = "FLOAT";
    // 布尔型
    TokenType[TokenType["BOOLEAN"] = 6] = "BOOLEAN";
    // 字符串
    TokenType[TokenType["STRING"] = 7] = "STRING";
})(TokenType || (TokenType = {}));
exports.default = TokenType;

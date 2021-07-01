"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType_1 = __importDefault(require("./TokenType"));
/*
 * @Author: MFine
 * @Date: 2021-06-29 00:55:57
 * @LastEditTime: 2021-06-29 01:05:34
 * @LastEditors: MFine
 * @Description:
 */
var Token = /** @class */ (function () {
    function Token(type, value) {
        this._type = null;
        this._value = null;
        this._type = type;
        this._value = value;
    }
    Object.defineProperty(Token.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Token.prototype.isVariable = function () {
        return this._type == TokenType_1.default.VARIABLE;
    };
    Token.prototype.isScalar = function () {
        return (this._type == TokenType_1.default.INTEGER ||
            this._type == TokenType_1.default.FLOAT ||
            this._type == TokenType_1.default.STRING ||
            this._type == TokenType_1.default.BOOLEAN);
    };
    Token.prototype.toString = function () {
        return "type " + this._type + ",value " + this._value;
    };
    return Token;
}());
exports.default = Token;

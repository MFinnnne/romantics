import TokenType from './TokenType';
import PeekIterator from "../commons/PeekIterator";
import AlphabetHelper from "./AlphabetHelper";
import KeyWords from "./KeyWords";
import LexicalException from "./LexicalException";

/*
 * @Author: MFine
 * @Date: 2021-06-29 00:55:57
 * @LastEditTime: 2021-06-29 01:05:34
 * @LastEditors: MFine
 * @Description:
 */
export default class Token {
    private readonly _type: TokenType | null = null;
    private readonly _value: string | null = null;

    constructor(type: TokenType, value: string | null) {
        this._type = type;
        this._value = value;
    }

    get type() {
        return this._type;
    }

    get value() {
        return this._value;
    }

    isVariable() {
        return this._type == TokenType.VARIABLE;
    }

    isType() {
        let flag = false;
        for (let tokenTypeKey in TokenType) {
            if (tokenTypeKey == this._type + "") {
                flag = true;
                break;
            }
        }
        return flag;
    }


    isScalar() {
        return (
            this._type == TokenType.INTEGER ||
            this._type == TokenType.FLOAT ||
            this._type == TokenType.STRING ||
            this._type == TokenType.BOOLEAN
        );
    }

    static makeVarOrKeyword(it: PeekIterator<string>): Token {
        let s = "";
        while (it.hasNext()) {
            const lookahead: string | null = it.peek();
            if (lookahead) {
                if (AlphabetHelper.isLiteral(lookahead)) {
                    s += lookahead;
                } else {
                    break;
                }
                it.next()
            }
        }
        if (KeyWords.isKeyWords(s)) {
            return new Token(TokenType.KEYWORD, s);
        }
        if (s === "true" || s === "false") {
            return new Token(TokenType.BOOLEAN, s);
        }
        return new Token(TokenType.VARIABLE, s);
    }

    static makeString(it: PeekIterator<string>): Token {
        let s = "";
        let state = 0;
        while (it.hasNext()) {
            const c: string | null = it.next();
            if (c == null) {
                continue;
            }
            switch (state) {
                case 0:
                    if (c == '\'') {
                        s += c;
                        state = 1;
                    }
                    if (c == '"') {
                        s += c;
                        state = 2;
                    }
                    break;
                case 1:
                    if (c == '\'') {
                        s += c;
                        return new Token(TokenType.STRING, s.toString());
                    } else {
                        s += c;
                    }
                    break;
                case 2:
                    if (c == '"') {
                        s += c;
                        return new Token(TokenType.STRING, s.toString());
                    }
                    s += c;
                    break;
                default:
                    break;
            }
        }
        throw new LexicalException("unexpected error");
    }

    static makeOp(it: PeekIterator<string>): Token {
        let state = 0;
        while (it.hasNext()) {
            const lookahead: string | null = it.next();
            if (lookahead == null) {
                continue;
            }
            switch (state) {
                case 0:
                    switch (lookahead) {
                        case '+':
                            state = 1;
                            break;
                        case '-':
                            state = 2;
                            break;
                        case '*':
                            state = 3;
                            break;
                        case '/':
                            state = 4;
                            break;
                        case '>':
                            state = 5;
                            break;
                        case '<':
                            state = 6;
                            break;
                        case '=':
                            state = 7;
                            break;
                        case '!':
                            state = 8;
                            break;
                        case '&':
                            state = 9;
                            break;
                        case '|':
                            state = 10;
                            break;
                        case '^':
                            state = 11;
                            break;
                        case '%':
                            state = 12;
                            break;
                        case ',':
                            return new Token(TokenType.OPERATOR, ",");
                        case ';':
                            return new Token(TokenType.OPERATOR, ";");
                        default:
                            break;
                    }
                    break;
                case 1:
                    switch (lookahead) {
                        case '+':
                            return new Token(TokenType.OPERATOR, "++");
                        case '=':
                            return new Token(TokenType.OPERATOR, "+=");
                        default:
                            it.putBack();
                            return new Token(TokenType.OPERATOR, "+");
                    }
                case 2:
                    switch (lookahead) {
                        case '-':
                            return new Token(TokenType.OPERATOR, "--");
                        case '=':
                            return new Token(TokenType.OPERATOR, "-=");
                        default:
                            it.putBack();
                            return new Token(TokenType.OPERATOR, "-");
                    }
                case 3:
                    if (lookahead == '=') {
                        return new Token(TokenType.OPERATOR, "*=");
                    }
                    it.putBack();
                    return new Token(TokenType.OPERATOR, "*");
                case 4:
                    if (lookahead == '=') {
                        return new Token(TokenType.OPERATOR, "/=");
                    }
                    it.putBack();
                    return new Token(TokenType.OPERATOR, "/");
                case 5:
                    switch (lookahead) {
                        case '>':
                            return new Token(TokenType.OPERATOR, ">>");
                        case '=':
                            return new Token(TokenType.OPERATOR, ">=");
                        default:
                            it.putBack();
                            return new Token(TokenType.OPERATOR, ">");
                    }
                case 6:
                    switch (lookahead) {
                        case '>':
                            return new Token(TokenType.OPERATOR, "<<");
                        case '=':
                            return new Token(TokenType.OPERATOR, "<=");
                        default:
                            it.putBack();
                            return new Token(TokenType.OPERATOR, "<");
                    }
                case 7:
                    if (lookahead == '=') {
                        return new Token(TokenType.OPERATOR, "==");
                    }
                    it.putBack();
                    return new Token(TokenType.OPERATOR, "=");
                case 8:
                    if (lookahead == '=') {
                        return new Token(TokenType.OPERATOR, "!=");
                    }
                    it.putBack();
                    return new Token(TokenType.OPERATOR, "!");
                case 9:
                    switch (lookahead) {
                        case '=':
                            return new Token(TokenType.OPERATOR, "&=");
                        case '&':
                            return new Token(TokenType.OPERATOR, "&&");
                        default:
                            it.putBack();
                            return new Token(TokenType.OPERATOR, "&");
                    }
                case 10:
                    switch (lookahead) {
                        case '=':
                            return new Token(TokenType.OPERATOR, "|=");
                        case '|':
                            return new Token(TokenType.OPERATOR, "||");
                        default:
                            it.putBack();
                            return new Token(TokenType.OPERATOR, "|");
                    }
                case 11:
                    if (lookahead == '=') {
                        return new Token(TokenType.OPERATOR, "^=");
                    }
                    it.putBack();
                    return new Token(TokenType.OPERATOR, "^");
                case 12:
                    if (lookahead == '=') {
                        return new Token(TokenType.OPERATOR, "%=");
                    }
                    it.putBack();
                    return new Token(TokenType.OPERATOR, "%");
                default:
                    break;
            }
        }
        throw new LexicalException("unexpected error");
    }


    static makeNumber(it: PeekIterator<string>): Token {
        let state = 0;
        let res = "";
        while (it.hasNext()) {
            const lookahead: string | null = it.peek();
            if (lookahead == null) {
                continue;
            }
            switch (state) {
                case 0:
                    if (lookahead === '0') {
                        state = 1;
                    } else if (AlphabetHelper.isNumber(lookahead)) {
                        state = 2;
                    } else if (lookahead == '-' || lookahead == '+') {
                        state = 3;
                    } else if (lookahead == '.') {
                        res += '.';
                        state = 5;
                    }
                    break;
                case 1:
                    if (lookahead == '0') {
                        if ("0" === res) {
                            res = "";
                        }
                        state = 1;
                    } else if (AlphabetHelper.isNumber(lookahead)) {
                        if ("0" === res) {
                            res = "";
                        }
                        state = 2;
                    } else if (lookahead == '.') {
                        state = 4;
                    } else {
                        return new Token(TokenType.INTEGER, res);
                    }
                    break;
                case 2:
                    if (AlphabetHelper.isNumber(lookahead)) {
                        state = 2;
                    } else if (lookahead == '.') {
                        state = 4;
                    } else {
                        return new Token(TokenType.INTEGER, res);
                    }
                    break;
                case 3:
                    if (AlphabetHelper.isNumber(lookahead)) {
                        state = 2;
                    } else if (lookahead == '.') {
                        state = 5;
                    } else {
                        throw new LexicalException("unexpected token:" + lookahead);
                    }
                    break;
                case 4:
                    if (lookahead == '.') {
                        throw new LexicalException("unexpected token:" + lookahead);
                    } else if (AlphabetHelper.isNumber(lookahead)) {
                        state = 6;
                    } else {
                        return new Token(TokenType.FLOAT, res);
                    }
                    break;
                case 5:
                    if (AlphabetHelper.isNumber(lookahead)) {
                        state = 6;
                    } else {
                        return new Token(TokenType.FLOAT, res);
                    }
                    break;
                case 6:
                    if (AlphabetHelper.isNumber(lookahead)) {
                        state = 6;
                    } else if (lookahead == '.') {
                        throw new LexicalException("unexpected token:" + lookahead);
                    } else {
                        return new Token(TokenType.FLOAT, res);
                    }
                    break;
                default:
                    break;

            }
            it.next();
            res += lookahead;

        }
        throw new LexicalException("unexpected error");
    }


    toString() {
        return `type ${this._type},value ${this._value}`;
    }

    isNumber() {
        return this._type === TokenType.FLOAT || this._type === TokenType.INTEGER;
    }

    isOperator() {
        return this._type === TokenType.OPERATOR;
    }

    isValue() {
        return this.isVariable()|| this.isScalar();
    }
}

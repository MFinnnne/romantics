import Token from "../lexer/Token";

export default class ParseException extends Error {
    constructor(msg: string) {
        super(msg);
    }

    static fromToken(token: Token) {
        return new ParseException(`Syntax Error, unexpected token ${token.value}`)
    }
}
import PeekIterator from "../commons/PeekIterator";
import Token from "../lexer/Token";
import ParseException from "./ParseException";
import TokenType from "../lexer/TokenType";

export default class PeekTokenIterator extends PeekIterator<Token> {
    constructor(it: Iterator<Token>) {
        super(it, null);

    }

    nextMatch(value: string | TokenType) {
        const token = this.next();
        if (typeof value === "string") {
            if (token.value !== value) {
                throw ParseException.fromToken(token)
            }
        } else {
            if (token.type !== value) {
                throw ParseException.fromToken(token);
            }
        }
        return token;
    }

}
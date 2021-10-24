/*
 * @Author: MFine
 * @Date: 2021-06-29 01:06:03
 * @LastEditTime: 2021-06-29 01:06:27
 * @LastEditors: MFine
 * @Description: 
 */
import Token from "./Token";
import PeekIterator from "../commons/PeekIterator";
import TokenType from "./TokenType";
import AlphabetHelper from "./AlphabetHelper";

export default class Lexer {


    public analyse(source: Iterator<string>): Token[] {
        const it: PeekIterator<string> = new PeekIterator(source, '\0');
        const tokens: Token[] = []
        while (it.hasNext()) {
            const next: string | null = it.next();
            if (next == null) {
                continue;
            }
            if (next == '\0') {
                break
            }
            let lookahead: string | null = it.peek();
            if (lookahead == null) {
                lookahead = '\0';
            }
            if (next === ' ' || next === '\n') {
                continue;
            }
            // 删除注释
            if (next === '/') {
                if (lookahead === '/') {
                    while (it.hasNext() && it.next() != '\n') {
                    }
                } else if (lookahead === '*') {
                    it.next();
                    let valid: boolean = false;
                    while (it.hasNext()) {
                        const c: string | null = it.next();
                        if (c !== '*' && it.peek() === '/') {
                            it.next()
                            valid = true;
                            break;
                        }
                    }
                    throw new LexicalException('unexpected error');
                }
                continue;
            }

            if (next === '\"' || next === '\'') {
                it.putBack();
                tokens.push(Token.makeString(it));
                continue;
            }

            // 提取关键字
            if (AlphabetHelper.isLetter(next)) {
                it.putBack();
                const token: Token = Token.makeVarOrKeyword(it);
                tokens.push(token);
                continue
            }

            if (next === '{' || next === '}' || next === '(' || next === ')') {
                tokens.push(new Token(TokenType.BRACKET, next));
                continue
            }

            if (AlphabetHelper.isNumber(next)) {
                it.putBack();
                const token: Token = Token.makeNumber(it);
                tokens.push(token)
                continue;
            }

            if ((next === '+' || next === '-' || next === '.') && AlphabetHelper.isNumber(lookahead)) {
                const end: Token = tokens[tokens.length - 1];
                if (end == null || !end.isNumber() || end.isOperator()) {
                    it.putBack();
                    tokens.push(Token.makeNumber(it));
                    continue
                }
            }

            if (AlphabetHelper.isOperator(next)) {
                it.putBack();
                tokens.push(Token.makeOp(it));
                continue
            }
            throw new LexicalException(next);

        }
        return tokens;
    }
}
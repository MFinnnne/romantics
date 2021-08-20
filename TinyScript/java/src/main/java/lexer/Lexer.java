package lexer;

import commons.AlphabetHelper;
import commons.PeekIterator;

import java.util.ArrayList;
import java.util.stream.Stream;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/6/29 0:44
 **/
public class Lexer {

    public ArrayList<Token> analyse(Stream<Character> source) throws LexicalException {
        ArrayList<Token> tokens = new ArrayList<>();
        PeekIterator<Character> iterator = new PeekIterator<>(source, (char) 0);
        while (iterator.hasNext()) {
            Character next = iterator.next();
            if (next == (char) 0) {
                break;
            }
            Character lookahead = iterator.peek();
            if (next == ' ' || next.equals('\n')) {
                continue;
            }
            //删除注释
            if (next == '/') {
                if (lookahead == '/') {
                    while (iterator.hasNext() && iterator.next() != '\n') {
                        ;
                    }
                } else if (lookahead == '*') {
                    iterator.next();
                    boolean valid = false;
                    while (iterator.hasNext()) {
                        Character c = iterator.next();
                        if (c == '*' && iterator.peek() == '/') {
                            valid = true;
                            iterator.next();
                            break;
                        }
                    }
                    if (!valid) {
                        throw new LexicalException("comments not match");
                    }
                }
                continue;
            }

            if (next == '{' || next == '}' || next == '(' || next == ')') {
                tokens.add(new Token(TokenType.BRACKET, next + ""));
                continue;
            }

            if (next == '"' || next == '\'') {
                iterator.putBack();
                tokens.add(Token.makeString(iterator));
            }

            if (AlphabetHelper.isLetter(next)) {
                iterator.putBack();
                tokens.add(Token.makeVarOrKeyword(iterator));
                continue;
            }

            if (AlphabetHelper.isNumber(next)) {
                iterator.putBack();
                tokens.add(Token.makeNumber(iterator));
                continue;
            }
            if ((next == '+' || next == '-' || next == '.') && AlphabetHelper.isNumber(lookahead)) {
                Token token = tokens.isEmpty()? null : tokens.get(tokens.size() - 1);
                if (token == null || !token.isNumber() || token.isOperator()) {
                    iterator.putBack();
                    tokens.add(Token.makeNumber(iterator));
                    continue;
                }
            }
            if (AlphabetHelper.isOperator(next)) {
                iterator.putBack();
                tokens.add(Token.makeOp(iterator));
                continue;
            }
            throw new LexicalException(next);
        }
        return tokens;
    }
}

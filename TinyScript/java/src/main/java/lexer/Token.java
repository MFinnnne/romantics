package lexer;

import commons.AlphabetHelper;
import commons.PeekIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/6/29 0:38
 **/
public class Token {
    private final TokenType type;
    private final String value;

    public String getValue() {
        return value;
    }


    public Token(TokenType type, String value) {
        this.type = type;
        this.value = value;
    }

    public TokenType getType() {
        return type;
    }

    @Override
    public String toString() {
        return String.format("type %s,value %s", type, value);
    }

    public boolean isVariable() {
        return type == TokenType.VARIABLE;
    }

    public boolean isScalar() {
        return type == TokenType.FLOAT || type == TokenType.INTEGER
                || type == TokenType.STRING || type == TokenType.BOOLEAN;
    }

    public static Token makeVarOrKeyword(PeekIterator<Character> it) {

        String s = "";
        while (it.hasNext()) {
            var lookahead = it.peek();
            if (AlphabetHelper.isLiteral(lookahead)) {
                s += lookahead;
            } else {
                break;
            }
            it.next();
        }
        if (KeyWords.isKeyword(s)) {
            return new Token(TokenType.KEYWORD, s);
        }
        if (s.equals("true") || s.equals("false")) {
            return new Token(TokenType.BOOLEAN, s);
        }
        return new Token(TokenType.VARIABLE, s);
    }

    public static Token makeString(PeekIterator<Character> it) throws LexicalException {
        StringBuilder s = new StringBuilder();
        int state = 0;
        while (it.hasNext()) {
            char c = it.next();
            switch (state) {
                case 0:
                    if (c == '\'') {
                        state = 1;
                    }
                    if (c == '\"') {
                        state = 2;
                    }
                    break;
                case 1:
                    if (c == '\'') {
                        return new Token(TokenType.STRING, s.toString());
                    } else {
                        s.append(c);
                    }
                    break;
                case 2:
                    if (c == '"') {
                        return new Token(TokenType.STRING, s.toString());
                    }
                    s.append(c);
                    break;
                default:
                    break;
            }
        }
        throw new LexicalException("unexpected error");
    }
}

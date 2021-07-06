package lexer;

import commons.AlphabetHelper;
import commons.PeekIterator;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/6/29 0:38
 **/
public class Token {
    private TokenType type;
    private String value;

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
}

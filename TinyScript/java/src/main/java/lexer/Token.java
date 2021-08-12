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

    public static Token makeOp(PeekIterator<Character> it) throws LexicalException {
        int state = 0;
        while (it.hasNext()) {
            Character lookahead = it.next();
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
}

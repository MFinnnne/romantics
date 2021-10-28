package lexer;

import commons.AlphabetHelper;
import commons.PeekIterator;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.stream.Stream;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/6/29 0:44
 **/
public class Lexer {

    public ArrayList<Token> analyse(PeekIterator<Character> source) throws LexicalException {
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
                continue;
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
                if (token == null || (!token.isNumber() && token.isOperator()&& !token.isVariable())) {
                    iterator.putBack();
                    tokens.add(Token.makeNumber(iterator));
                    continue;
                }else{
                    iterator.putBack();
                    Token op = Token.makeOp(iterator);
                    tokens.add(op);
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

    public ArrayList<Token> analyse(Stream source) throws LexicalException {
        var it = new PeekIterator<Character>(source, (char)0);
        return this.analyse(it);
    }

    /**
     * 从源代码文件加载并解析
     * @param src
     * @return
     * @throws FileNotFoundException
     * @throws UnsupportedEncodingException
     * @throws LexicalException
     */
    public static ArrayList<Token> fromFile(String src) throws FileNotFoundException, UnsupportedEncodingException, LexicalException {
        var file = new File(src);
        var fileStream = new FileInputStream(file);
        var inputStreamReader = new InputStreamReader(fileStream, "UTF-8");

        var br = new BufferedReader(inputStreamReader);


        /**
         * 利用BufferedReader每次读取一行
         */
        var it = new Iterator<Character>() {
            private String line = null;
            private int cursor = 0;

            private void readLine() throws IOException {
                if(line == null || cursor == line.length()) {
                    line = br.readLine();
                    cursor = 0;
                }
            }
            @Override
            public boolean hasNext() {
                try {
                    readLine();
                    return line != null;
                } catch (IOException e) {
                    return false;
                }
            }

            @Override
            public Character next() {
                try {
                    readLine();
                    return line != null ? line.charAt(cursor++) :null;
                } catch (IOException e) {
                    return null;
                }
            }

        };

        var peekIt = new PeekIterator<>(it, '\0');
        var lexer = new Lexer();
        return lexer.analyse(peekIt);
    }
}

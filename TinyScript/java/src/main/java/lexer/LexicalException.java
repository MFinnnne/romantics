package lexer;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/7/5 0:31
 **/
public class LexicalException extends Exception {

    private String msg;

    public LexicalException(char c) {
        msg = String.format("Unexpected character %c", c);
    }

    public LexicalException(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
       return this.msg;
    }
}

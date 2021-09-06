package paser.util;

import lexer.Token;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/9/3 0:09
 **/
public class ParseException extends Exception{
    private String msg;

    public ParseException(String msg) {
        this.msg = msg;
    }

    public ParseException(Token token){
        this.msg = String.format("Syntax Error,unexpected token %s", token.getValue());
    }

    @Override
    public String getMessage() {
        return this.msg;
    }
}

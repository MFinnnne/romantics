package translator.symbol;

import lexer.Token;

public class Symbol {
    SymbolTable parent;
    Token lexeme;
    String label;
    int offset;
    int layerOffset = 0;
    SymbolType type;

    public Symbol(SymbolType type) {
        this.type = type;
    }


    public static Symbol  createAddressSymbol(Token lexeme,int offset){
        Symbol symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
        symbol.lexeme = lexeme;
        symbol.offset = offset;
        return  symbol;
    }


}

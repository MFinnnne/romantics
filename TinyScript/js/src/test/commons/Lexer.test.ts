import Token from "../../lexer/Token";
import TokenType from "../../lexer/TokenType";
import Lexer from "../../lexer/Lexer";
import arrayToGenerator from "../../commons/ArrayToGenerator";

const assertToken = (token: Token, value: string, type: TokenType)=>{
    expect(value).toEqual(token.value);
    expect(type).toEqual(token.type);
}

describe("test lexer", () => {
    test('test expression',()=>{
        const lexer = new Lexer();
        const source = "(a+b)^100.12==+100-20";
        const tokens = lexer.analyse(arrayToGenerator([...source]));
        expect(tokens.length).toEqual(11);
    })
})
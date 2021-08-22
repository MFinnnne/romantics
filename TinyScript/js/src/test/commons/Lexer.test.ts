import Token from "../../lexer/Token";
import TokenType from "../../lexer/TokenType";
import Lexer from "../../lexer/Lexer";
import arrayToGenerator from "../../commons/ArrayToGenerator";

const assertToken = (token: Token, value: string, type: TokenType) => {
    expect(value).toEqual(token.value);
    expect(type).toEqual(token.type);
}

describe("test lexer", () => {
    test('test expression', () => {
        const lexer = new Lexer();
        const source = "(a+b)^100.12==+100-20";
        const tokens = lexer.analyse(arrayToGenerator([...source]));
        expect(tokens.length).toEqual(11);
        assertToken(tokens[0], "(", TokenType.BRACKET);
        assertToken(tokens[1], "a", TokenType.VARIABLE);
        assertToken(tokens[2], "+", TokenType.OPERATOR);
        assertToken(tokens[3], "b", TokenType.VARIABLE);
        assertToken(tokens[4], ")", TokenType.BRACKET);
        assertToken(tokens[5], "^", TokenType.OPERATOR);
        assertToken(tokens[6], "100.12", TokenType.FLOAT);
        assertToken(tokens[7], "==", TokenType.OPERATOR);
        assertToken(tokens[8], "+100", TokenType.INTEGER);
        assertToken(tokens[9], "-", TokenType.OPERATOR);
        assertToken(tokens[10], "20", TokenType.INTEGER);
    })

    test('test function', () => {
        const source: string = "func foo(a,b){\n" +
            "printf(a+b)\n" +
            "}\n" +
            "foo(-100.0,900)";
        const lexer: Lexer = new Lexer();
        const tokens: Token[] = lexer.analyse(arrayToGenerator([...source]));
        assertToken(tokens[0], "func", TokenType.KEYWORD);
        assertToken(tokens[1], "foo", TokenType.VARIABLE);
        assertToken(tokens[2], "(", TokenType.BRACKET);
        assertToken(tokens[3], "a", TokenType.VARIABLE);
        assertToken(tokens[4], ",", TokenType.OPERATOR);
        assertToken(tokens[5], "b", TokenType.VARIABLE);
        assertToken(tokens[6], ")", TokenType.BRACKET);
        assertToken(tokens[7], "{", TokenType.BRACKET);
        assertToken(tokens[8], "printf", TokenType.VARIABLE);
        assertToken(tokens[9], "(", TokenType.BRACKET);
        assertToken(tokens[10], "a", TokenType.VARIABLE);
        assertToken(tokens[11], "+", TokenType.OPERATOR);
        assertToken(tokens[12], "b", TokenType.VARIABLE);
        assertToken(tokens[13], ")", TokenType.BRACKET);
        assertToken(tokens[14], "}", TokenType.BRACKET);
        assertToken(tokens[15], "foo", TokenType.VARIABLE);
        assertToken(tokens[16], "(", TokenType.BRACKET);
        assertToken(tokens[17], "-100.0", TokenType.FLOAT);
        assertToken(tokens[18], ",", TokenType.OPERATOR);
        assertToken(tokens[19], "900", TokenType.INTEGER);
        assertToken(tokens[20], ")", TokenType.BRACKET);
    })
})
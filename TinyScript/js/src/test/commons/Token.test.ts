import PeekIterator from "../../main/js/commons/PeekIterator";
import arrayToGenerator from "../../main/js/commons/ArrayToGenerator";
import Token from "../../main/js/lexer/Token";
import TokenType from "../../main/js/lexer/TokenType";
import * as assert from "assert";
import ASTNodeTypes from "../../main/js/parser/ast/ASTNodeTypes";

function assertToken(token:Token, value: string, type: TokenType) {
    assert.equal(token.value, value)
    assert.equal(token.type, type)
}

describe("test token", () => {
    test('test VarOrKeyword', () => {
        const data = 'true asdas'
        const it: PeekIterator<string> = new PeekIterator<string>(arrayToGenerator<string>([...data]))
        const token: Token = Token.makeVarOrKeyword(it);
        expect(token.value).toEqual("true")
        expect(token.type).toEqual(TokenType.BOOLEAN)

        const data1 = 'if asdas'
        const it1: PeekIterator<string> = new PeekIterator<string>(arrayToGenerator<string>([...data1]))
        const token1: Token = Token.makeVarOrKeyword(it1);
        expect(token1.value).toEqual("if")
        expect(token1.type).toEqual(TokenType.KEYWORD)
    })
    test('test makeString', () => {
        const tests: string[] = [
            "'123'",
            '"123"',
        ];
        const peekIterators: PeekIterator<string>[] = tests.map(item => {
            return new PeekIterator<string>(arrayToGenerator([...item]))
        });
        for (const [index, peekIterator] of peekIterators.entries()) {
            const token2 = Token.makeString(peekIterator);
            assertToken(token2, tests[index], TokenType.STRING);
        }
    })

    test("test make op", () => {
        const tests: string[] = [
            "+ xx",
            "++mm",
            "- xx",
            "--mm",
            "/=g",
            "= 1",
            "==sad",
            "&=sada",
            "&yy",
            "||xxs",
            "^=11",
            "%7"
        ];
        let i = 0;
        const results: string[] = ["+", "++", "-", "--", "/=", "=", "==", "&=", "&", "||", "^=", "%"];
        for (const test of tests) {
            const iterator: PeekIterator<string> = new PeekIterator<string>(arrayToGenerator([...test]));
            const token: Token = Token.makeOp(iterator);
            expect(token.value).toEqual(results[i++]);
            expect(token.type).toEqual(TokenType.OPERATOR);
        }
    })

    test("test make number", () => {
        const tests: string[] = [
            "10",
            "0000xx",
            "0.21d1",
            "021dew",
            "2.11sd",
            "21sa",
            "-1xx",
            "20",
            "1231.1231x"
        ];
        const results: string[] = ["10", "0", "0.21", "21", "2.11", "21", "-1", "20", "1231.1231"];
        let i = 0;
        for (const test of tests) {
            const iterator: PeekIterator<string> = new PeekIterator<string>(arrayToGenerator([...test]), '\0');
            const token3 = Token.makeNumber(iterator);
            expect(token3.value).toEqual(results[i++]);
        }
    })
})
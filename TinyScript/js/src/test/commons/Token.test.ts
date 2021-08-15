import PeekIterator from "../../commons/PeekIterator";
import arrayToGenerator from "../../commons/ArrayToGenerator";
import Token from "../../lexer/Token";
import TokenType from "../../lexer/TokenType";

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
            "\"123\"",
            "'123'",
        ];
        const peekIterators: PeekIterator<string>[] = tests.map(item => {
            return new PeekIterator<string>(arrayToGenerator([...item]))
        });
        for (const peekIterator of peekIterators) {
            const token2 = Token.makeString(peekIterator);
            expect(token2.value).toEqual("123")
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
        let i: number = 0;
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
            "0000xx",
            "0.21d1",
            "021dew",
            "2.11sd",
            "21sa",
            "-1xx",
            "+1a",
            "1231.1231x"
        ];
        const results: string[] = ["0", "0.21", "21", "2.11", "21", "-1", "+1", "1231.1231"];
        let i: number = 0;
        for (const test of tests) {
            const iterator: PeekIterator<string> = new PeekIterator<string>(arrayToGenerator([...test]));
            let token3 = Token.makeNumber(iterator);
            expect(token3.value).toEqual(results[i++]);
        }
    })
})
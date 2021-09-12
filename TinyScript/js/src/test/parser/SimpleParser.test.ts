import Lexer from "../../main/js/lexer/Lexer";
import Token from "../../main/js/lexer/Token";
import arrayToGenerator from "../../main/js/commons/ArrayToGenerator";
import SimpleParser from "../../main/js/parser/SimpleParser";
import PeekTokenIterator from "../../main/js/parser/PeekTokenIterator";
import ASTNode from "../../main/js/parser/ast/ASTNode";
import * as assert from "assert";

describe("test simple parser", () => {
    test("test 1+2+3+4", () => {
        const source: string = "1+2+3+4";
        const lexer: Lexer = new Lexer();
        const tokens: Token[] = lexer.analyse(arrayToGenerator([...source]));
        const iterator = new PeekTokenIterator(arrayToGenerator(tokens));
        const astNode: ASTNode = SimpleParser.parse(iterator);

        expect(astNode.lexeme?.value).toEqual("+")
        const v1 = astNode.getChildren(0) as ASTNode;
        const e1 = astNode.getChildren(1) as ASTNode;

        expect(v1.lexeme?.value).toEqual("1");
        expect(e1.lexeme?.value).toEqual("+");

        const v2 = e1.getChildren(0) as ASTNode;
        const e2 = e1.getChildren(1) as ASTNode;

        expect(v2.lexeme?.value).toEqual("2");
        expect(e2.lexeme?.value).toEqual("+");

        const v3 = e2.getChildren(0) as ASTNode;
        const e3 = e2.getChildren(1) as ASTNode;

        expect(v3.lexeme?.value).toEqual("3");
        expect(e3.lexeme?.value).toEqual("4");
    })
})
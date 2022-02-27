import Lexer from "../main/js/lexer/Lexer";
import arrayToGenerator from "../main/js/commons/ArrayToGenerator";
import PeekTokenIterator from "../main/js/parser/PeekTokenIterator";
import ParserUtils from "../main/js/parser/util/ParserUtils";
import DeclareStmt from "../main/js/parser/ast/DeclareStmt";
import IfStmt from "../main/js/parser/ast/IfStmt";


const {AssignStmt} = require('../main/js/parser/ast/index')

describe("stmt test", () => {
    it("should parse a assignStmt", () => {
        const it = createTokenIt("i=100*2")
        const assignStmt = AssignStmt.parse(it);
        expect(ParserUtils.toPostfixExpression(assignStmt)).toEqual("i 100 2 * =")
    });


    it("should parse a declare stmt", () => {
        const it = createTokenIt("var i=100*2")
        const assignStmt = DeclareStmt.parse(it);
        expect(ParserUtils.toPostfixExpression(assignStmt)).toEqual("i 100 2 * =")
    });

    it('should parse if else stmt', function () {
        const it = createTokenIt(`if(a){a=1}`);
        const stmt = IfStmt.parse(it);
        const ifConditionExpr = stmt.getExpr();
        const ifBlock = stmt.getBlock();
        const assignStmt = ifBlock.getChildren(0);
        const elseBlock = stmt.getChildren(2)
    });
})

function createTokenIt(src: string): PeekTokenIterator {
    const lexer = new Lexer();
    const tokens = lexer.analyse(arrayToGenerator([...src]));
    return new PeekTokenIterator(arrayToGenerator(tokens));
}
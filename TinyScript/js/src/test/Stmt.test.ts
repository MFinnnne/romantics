import Lexer from "../main/js/lexer/Lexer";
import arrayToGenerator from "../main/js/commons/ArrayToGenerator";
import PeekTokenIterator from "../main/js/parser/PeekTokenIterator";
import ParserUtils from "../main/js/parser/util/ParserUtils";
import DeclareStmt from "../main/js/parser/ast/DeclareStmt";
import IfStmt from "../main/js/parser/ast/IfStmt";
import * as path from "path";
import Stmt from "../main/js/parser/ast/Stmt";
import FunctionDefineStmt from "../main/js/parser/ast/FunctionDefineStmt";
import ASTNodeTypes from "../main/js/parser/ast/ASTNodeTypes";
import Variable from "../main/js/parser/ast/Variable";
import ReturnStmt from "../main/js/parser/ast/ReturnStmt";


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

    it('should parse if stmt', function () {
        const it = createTokenIt(`if(a){a=1}`);
        const stmt = IfStmt.parse(it);
        const ifConditionExpr = stmt.getExpr();
        expect(ParserUtils.toPostfixExpression(ifConditionExpr)).toEqual("a")
        const ifBlock = stmt.getBlock();
        const assignStmt = ifBlock.getChildren(0);
        expect(ParserUtils.toPostfixExpression(assignStmt)).toEqual("a 1 =")
        const elseBlock = stmt.getChildren(2)
        expect(elseBlock).toBeUndefined()
    });

    it('should parse if else stmt', function () {
        const it = createTokenIt(`if(a){a=1}else{a=2}`);
        const stmt = IfStmt.parse(it);
        const ifConditionExpr = stmt.getExpr();
        expect(ParserUtils.toPostfixExpression(ifConditionExpr)).toEqual("a")
        const ifBlock = stmt.getBlock();
        const assignStmt = ifBlock.getChildren(0);
        expect(ParserUtils.toPostfixExpression(assignStmt)).toEqual("a 1 =")
        const elseBlock = stmt.getChildren(2);
        if (elseBlock != null) {
            expect(ParserUtils.toPostfixExpression(elseBlock.getChildren(0))).toEqual("a 2 =")
        }
    });

    it('should parse if else if stmt', function () {
        const it = createTokenIt(`if(a){a=1}else if(b==3){
        a=5
        c=6
        }`);
        const stmt = IfStmt.parse(it);
        const ifConditionExpr = stmt.getExpr();
        expect(ParserUtils.toPostfixExpression(ifConditionExpr)).toEqual("a")
        const ifBlock = stmt.getBlock();
        const assignStmt = ifBlock.getChildren(0);
        expect(ParserUtils.toPostfixExpression(assignStmt)).toEqual("a 1 =")
        const elseBlock = stmt.getChildren(2);
        if (elseBlock != null) {
            expect(ParserUtils.toPostfixExpression(elseBlock.getChildren(0))).toEqual("b 3 ==")
            const elseIfBlock = elseBlock.getChildren(1);
            expect(ParserUtils.toPostfixExpression(elseIfBlock?.getChildren(0))).toEqual("a 5 =")
            expect(ParserUtils.toPostfixExpression(elseIfBlock?.getChildren(1))).toEqual("c 6 =")
        }
    });


    it("should parse function stmt", () => {
        const it = Lexer.fromFile(path.resolve(__dirname, "../../example/function.ts"));
        const functionStmt = Stmt.parse(new PeekTokenIterator(it)) as FunctionDefineStmt;
        functionStmt?.print();
        const args = functionStmt.getArgs();
        expect(args.children.length).toEqual(2);
        const funcVar1 = args.children[0] as Variable;
        expect(funcVar1.typeLexeme?.value).toEqual("int");
        expect(funcVar1.lexeme?.value).toEqual("a");
        const funcVar2 = args.children[1] as Variable;
        expect(funcVar2.lexeme?.value).toEqual("b");
        expect(funcVar2.typeLexeme?.value).toEqual("int");
        const variables = functionStmt.getFunctionVariables();
        expect(variables.lexeme?.value).toEqual('add');
        expect(variables.typeLexeme?.value).toEqual('int');
        const block = functionStmt.getBlock();
        const returnStmt = block.getChildren(0) as ReturnStmt;
        expect(ParserUtils.toPostfixExpression(returnStmt.getChildren(0))).toEqual("a b +");
    })


    it("should parse recursion function stmt", () => {
        const it = Lexer.fromFile(path.resolve(__dirname, "../../example/recursion.ts"));
        const tokenIterator = new PeekTokenIterator(it);
        const functionStmt = Stmt.parse(tokenIterator) as FunctionDefineStmt;
        functionStmt?.print();
        // const args = functionStmt.getArgs();
        // expect(args.children.length).toEqual(2);
        // const funcVar1 = args.children[0] as Variable;
        // expect(funcVar1.typeLexeme?.value).toEqual("int");
        // expect(funcVar1.lexeme?.value).toEqual("a");
        // const funcVar2 = args.children[1] as Variable;
        // expect(funcVar2.lexeme?.value).toEqual("b");
        // expect(funcVar2.typeLexeme?.value).toEqual("int");
        // const variables = functionStmt.getFunctionVariables();
        // expect(variables.lexeme?.value).toEqual('add');
        // expect(variables.typeLexeme?.value).toEqual('int');
        // const block = functionStmt.getBlock();
        // const returnStmt = block.getChildren(0) as ReturnStmt;
        // expect(ParserUtils.toPostfixExpression(returnStmt.getChildren(0))).toEqual("a b +");
    })

})

function createTokenIt(src: string): PeekTokenIterator {
    const lexer = new Lexer();
    const tokens = lexer.analyse(arrayToGenerator([...src]));
    return new PeekTokenIterator(arrayToGenerator(tokens));
}
import Lexer from "../../main/js/lexer/Lexer";
import arrayToGenerator from "../../main/js/commons/ArrayToGenerator";
import PeekTokenIterator from "../../main/js/parser/PeekTokenIterator";
import Expr from "../../main/js/parser/ast/Expr";
import ASTNode from "../../main/js/parser/ast/ASTNode";
import ParserUtils from "../../main/js/parser/util/ParserUtils";

const createExpr = (source: string): ASTNode | null => {
    const lexer = new Lexer();
    const tokens = lexer.analyse(arrayToGenerator([...source]));
    const iterator = new PeekTokenIterator(arrayToGenerator([...tokens]));
    return Expr.parse(iterator);

}

describe("parser expr test", () => {
    test("simple 1", () => {
        const expr = createExpr("1+1");
        expect(ParserUtils.toPostfixExpression(expr)).toEqual("1 1 +")
    })

    test("simple 2", () => {
        const expr = createExpr("1*1+1*1");
        expect(ParserUtils.toPostfixExpression(expr)).toEqual("1 1 * 1 1 * +")
    })

    test("simple 3", () => {
        const expr = createExpr("\"1\"==\"1\"");
        expect(ParserUtils.toPostfixExpression(expr)).toEqual("\"1\" \"1\" ==")
    })

    test("simple 4",()=>{
        const expr2 = createExpr("(1+1)*1");
        expect("1 1 + 1 *").toEqual(ParserUtils.toPostfixExpression(expr2));
    })

    test("simple 5",()=>{
        const expr3 = createExpr("(1*2!=7)==3!=4*5+6");
        console.log(ParserUtils.toPostfixExpression(expr3));
        expect("1 2 * 7 != 3 4 5 * 6 + != ==").toEqual(ParserUtils.toPostfixExpression(expr3));
    })

})


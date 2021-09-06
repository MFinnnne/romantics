import Lexer from "../../main/js/lexer/Lexer";
import Token from "../../main/js/lexer/Token";
import arrayToGenerator from "../../main/js/commons/ArrayToGenerator";
import SimpleParser from "../../main/js/parser/SimpleParser";
import PeekTokenIterator from "../../main/js/parser/PeekTokenIterator";

describe("test simple parser",()=>{
    test("test 1+2+3+4",()=>{
        const source: string = "1+2+3+4";
        const lexer: Lexer = new Lexer();
        const tokens: Token[] = lexer.analyse(arrayToGenerator([...source]));
        const iterator = new PeekTokenIterator(arrayToGenerator(tokens));
        const astNode = SimpleParser.parse(iterator);
        console.log(astNode);
    })
})
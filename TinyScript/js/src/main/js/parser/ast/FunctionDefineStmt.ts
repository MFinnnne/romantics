import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import Variable from "./Variable";
import ParseException from "../ParseException";
import PeekTokenIterator from "../PeekTokenIterator";
import FunctionArgs from "./FunctionArgs";
import TokenType from "../../lexer/TokenType";
import Token from "../../lexer/Token";
import Block from "./Block";

export default class FunctionDefineStmt extends Stmt {

    constructor(types?: ASTNodeTypes, label?: string) {
        super(ASTNodeTypes.FUNCTION_DECLARE_STMT, "func");
    }

    public getFunctionArgs() {
        return this.getChildren(1);
    }

    public getFunctionVariables(): Variable {
        return this.getChildren(0) as Variable;
    }

    public getFunctionType(): string {
        const typeLexeme = this.getFunctionVariables().typeLexeme?.value;
        if (typeLexeme == null) {
            throw new Error("Function return type is not defined");
        }
        return typeLexeme;
    }

    public getBlock(): ASTNode {
        const block = this.getChildren(2);
        if (block == null) {
            throw new ParseException("function parse exception");
        }
        return block;

    }

    public getArgs(): FunctionArgs {
        return this.getChildren(1) as FunctionArgs;
    }

    public getFuncType(): string {
         const value = (this.getChildren(0) as Variable).typeLexeme?.value;
         if (value == null) {
             throw new Error("Function return type is not defined");
         }
         return value;
    }



    static parse(it: PeekTokenIterator): FunctionDefineStmt {
        const {Factor, Block} = require('./index')
        const functionDefineStmt = new FunctionDefineStmt();
        it.nextMatch("func");
        const funcVar: Variable = Factor.parse(it);
        if (funcVar == null) {
            throw new ParseException("function parse exception,can not find function name");
        }
        functionDefineStmt.addChild(funcVar);
        it.nextMatch("(");
        const functionArgs = FunctionArgs.parse(it);
        funcVar.addChild(functionArgs)
        it.nextMatch(")");
        const returnType = it.nextMatch(TokenType.KEYWORD);
        if (!returnType?.isType()) {
            throw ParseException.fromToken(returnType);
        }
        funcVar.typeLexeme = returnType;
        const blockStmt = Block.parse(it);
        functionDefineStmt.addChild(blockStmt);
        return functionDefineStmt;
    }

}
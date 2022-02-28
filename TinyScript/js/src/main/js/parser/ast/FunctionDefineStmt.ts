import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import Variable from "./Variable";
import ParseException from "../ParseException";
import PeekTokenIterator from "../PeekTokenIterator";

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


    static parse(it: PeekTokenIterator): FunctionDefineStmt {
        const {Factor} = require('./index')
        const functionDefineStmt = new FunctionDefineStmt();
        it.nextMatch("func");
        const funcVar = Factor.parse(it);
        if (funcVar == null) {
            throw new ParseException("function parse exception,can not find function name");
        }
        functionDefineStmt.addChild(funcVar);
        return functionDefineStmt;
    }

}
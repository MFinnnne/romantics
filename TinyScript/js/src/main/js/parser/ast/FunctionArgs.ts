import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";
import Variable from "./Variable";

export  default class FunctionArgs extends ASTNode {

    constructor() {
        super(ASTNodeTypes.FUCTION_ARGS, 'args');
    }

    static parse(it: PeekTokenIterator): FunctionArgs {
        const {Factor} = require('./index');
        const functionArgs = new FunctionArgs();
        while (it.peek()?.isType()) {
            const type = it.next();
            const variable = Factor.parse(it) as Variable;
            functionArgs.addChild(variable);
            variable.typeLexeme = type;
            if (it.peek()?.value !== ')') {
                it.nextMatch(',');
            }
        }
        return functionArgs;
    }
}

import Stmt from "./Stmt";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import Variable from "./Variable";

export default class FunctionDefineStmt extends Stmt {

    constructor(types: ASTNodeTypes | null, label: string | null) {
        super(ASTNodeTypes.FUNCTION_DECLARE_STMT, "function");
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


}
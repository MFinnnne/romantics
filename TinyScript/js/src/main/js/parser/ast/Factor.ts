import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";
import PeekTokenIterator from "../PeekTokenIterator";
import TokenType from "../../lexer/TokenType";
import Variable from "./Variable";

export default class Factor extends ASTNode {

    constructor(token: Token) {
        super();
        this.lexeme = token;
        this.label = token.value;
    }

    static parse(it: PeekTokenIterator): ASTNode | null {
        const token = it.peek();
        if (token?.isVariable()) {
            return new Variable(token);
        } else if (token?.isScalar()) {
            return new Factor(token);
        }
        return null;
    }
}
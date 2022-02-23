import ASTNode from "./ASTNode";
import Token from "../../lexer/Token";
import PeekTokenIterator from "../PeekTokenIterator";


export default class Factor extends ASTNode {

    constructor(token: Token) {
        super();
        this.lexeme = token;
        this.label = token.value;
    }

    static parse(it: PeekTokenIterator): ASTNode | null {

        const {Scalar, Variable} = require('./index')

        const token = it.peek();
        if (token?.isVariable()) {
            it.next();
            return new Variable.default(token);

        } else if (token?.isScalar()) {
            it.next();
            return new Scalar.default(token);
        }
        return null;
    }
}
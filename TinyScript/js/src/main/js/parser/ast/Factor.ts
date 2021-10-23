import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";
import PeekTokenIterator from "../PeekTokenIterator";
import TokenType from "../../lexer/TokenType";

export default class Factor extends ASTNode {

    constructor(parent: ASTNode | null, it: PeekTokenIterator) {
        super(parent, null, null);
        const next: Token | null = it.next();
        if (next !== null) {
            if (next.type === TokenType.VARIABLE) {
                this.type = ASTNodeTypes.VARIABLE;
            } else {
                this.type = ASTNodeTypes.SCALAR;
            }
            this.label = next.value;
            this.lexeme = next;
        }

    }
}
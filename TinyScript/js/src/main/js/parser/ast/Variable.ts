import Factor from "./Factor";
import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";

export default class Variable extends Factor {

    constructor(token:Token) {
        super(token);
        this.type = ASTNodeTypes.VARIABLE;
    }
}
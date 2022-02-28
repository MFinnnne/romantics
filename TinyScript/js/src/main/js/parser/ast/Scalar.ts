
import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";
import Factor from "./Factor";


export default class Scalar extends Factor {

    constructor(token: Token) {
        super(token);
        this.type = ASTNodeTypes.SCALAR;
    }
}
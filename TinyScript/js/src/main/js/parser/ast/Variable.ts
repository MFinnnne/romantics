import Factor from "./Factor";
import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";

export default class Variable extends Factor {
        private _typeLexeme:Token | null;


    constructor(token: Token) {
        super(token);
        this.type = ASTNodeTypes.VARIABLE;
        this._typeLexeme = null;
    }


    get typeLexeme(): Token | null {
        return this._typeLexeme;
    }

    set typeLexeme(value: Token | null) {
        this._typeLexeme = value;
    }
}
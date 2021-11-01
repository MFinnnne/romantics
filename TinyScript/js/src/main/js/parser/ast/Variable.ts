import Factor from "./Factor";
import ASTNode from "./ASTNode";
import ASTNodeTypes from "./ASTNodeTypes";
import PeekTokenIterator from "../PeekTokenIterator";
import Token from "../../lexer/Token";

export default class Variable extends Factor {

    constructor(token:Token) {
        super(token)
    }
}
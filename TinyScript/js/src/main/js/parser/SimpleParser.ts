import ASTNode from "./ast/ASTNode";
import PeekTokenIterator from "./PeekTokenIterator";
import Expr from "./ast/Expr";
import ASTNodeTypes from "./ast/ASTNodeTypes";
import Factor from "./ast/Factor";
import ParseException from "./ParseException";

export default class SimpleParser {
    static parse(it: PeekTokenIterator): ASTNode {
        const expr = new Expr(null);
        const scalar = Factor.parse(it);
        if (scalar == null) {
            throw new ParseException("parser exception")
        }
        if (!it.hasNext()) {
            return scalar;
        }
        expr.lexeme = it.peek();
        it.nextMatch("+");
        expr.label = "+";
        expr.addChild(scalar);
        expr.type = ASTNodeTypes.BINARY_EXPR;
        const astNode = SimpleParser.parse(it);
        expr.addChild(astNode);
        return expr;
    }
}
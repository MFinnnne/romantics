import ASTNode from "./ast/ASTNode";
import PeekTokenIterator from "./PeekTokenIterator";
import Expr from "./ast/Expr";
import Scalar from "./ast/Scalar";
import ASTNodeTypes from "./ast/ASTNodeTypes";

export default class SimpleParser {
    static parse(it: PeekTokenIterator): ASTNode {
        const expr = new Expr(null);
        const scalar = new Scalar(expr, it);
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
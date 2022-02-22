import ASTNode from "../ast/ASTNode";
import ASTNodeTypes from "../ast/ASTNodeTypes";

export default class ParserUtils {
    static toPostfixExpression(node: ASTNode | null): string | undefined {
        if (node == null) {
            return "";
        }
        let leftStr: string = "";
        let right: string = "";
        switch (node.type) {
            case ASTNodeTypes.BINARY_EXPR:
                leftStr = ParserUtils.toPostfixExpression(node.children[0]) ?? "";
                right = ParserUtils.toPostfixExpression(node.children[1]) ?? "";
                return leftStr + " " + right + " " + node.lexeme?.value ?? " ";
            case ASTNodeTypes.VARIABLE:

            case ASTNodeTypes.SCALAR:
                return node.lexeme?.value ?? "";
            default:
                break;
        }
    }
}
import ASTNode from "../ast/ASTNode";
import ASTNodeTypes from "../ast/ASTNodeTypes";

export default class ParserUtils {
    static toPostfixExpression(node: ASTNode | null): string | undefined {
        if (node == null) {
            return "";
        }
        let leftStr = "";
        let right = "";
        switch (node.type) {
            case ASTNodeTypes.DECLARE_STMT:
            case ASTNodeTypes.ASSIGN_STMT:
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
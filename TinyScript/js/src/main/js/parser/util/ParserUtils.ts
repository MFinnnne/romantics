import ASTNode from "../ast/ASTNode";
import ASTNodeTypes from "../ast/ASTNodeTypes";
import LinkedList from "ts-linked-list";

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

    static toBFSString(root: ASTNode, max: number): string {
        const queue: Array<ASTNode> = [];
        const list: Array<string> = [];
        queue.push(root);
        let c = 0;
        while (queue.length > 0 && c++ < max) {
            const node = queue.shift();
            if (node && node.label) {
                list.push(node.label);
                queue.push(...node.children)
            }
        }
        return list.join(" ");
    }
}

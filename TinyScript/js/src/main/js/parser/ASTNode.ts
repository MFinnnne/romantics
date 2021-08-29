import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../lexer/Token";

export default class ASTNode {

    protected children: ASTNode[] = []
    protected parent: ASTNode;
    protected lexeme: Token | undefined;
    protected label: string | null;
    protected types: ASTNodeTypes | null;


    constructor(parent: ASTNode, label: string | null, types: ASTNodeTypes | null) {
        this.parent = parent;
        this.label = label;
        this.types = types;
    }

    /**
     * get node by index
     * @param index
     * @return number
     */
    public getChildren(index: number | null): ASTNode | ASTNode[] {
        if (index == null) {
            return this.children
        }
        return this.children[index];
    }

    /**
     * add node in children
     * @param node
     * @return void
     */
    public addChild(node: ASTNode): void {
        this.children.push(node);
    }

    /**
     * @return token lexeme
     */
    public getLexeme(): Token | undefined {
        return this.lexeme;
    }
}
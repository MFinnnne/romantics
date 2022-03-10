import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";

export default class ASTNode {

    private _children: ASTNode[] = []
    protected parent: ASTNode | null;
    private _lexeme: Token | null = null;
    private _label: string | null | undefined;
    private _type: ASTNodeTypes | null | undefined;


    constructor(types?: ASTNodeTypes | null, label?: string | null) {
        this.parent = null;
        this._label = label;
        this._type = types;
    }


    get lexeme(): Token | null {
        return this._lexeme ?? null;
    }


    set lexeme(value: Token | null) {
        this._lexeme = value;
    }

    get label(): string | null {
        return this._label ?? null;
    }

    set label(value: string | null) {
        this._label = value;
    }

    get type(): ASTNodeTypes | null {
        return this._type ?? null;
    }

    set type(value: ASTNodeTypes | null) {
        this._type = value;
    }

    /**
     * get node by index
     * @param index
     * @return number
     */
    public getChildren(index: number): ASTNode {
        return this._children[index];
    }

    /**
     * add node in children
     * @param node
     * @return void
     */
    public addChild(node: ASTNode): void {
        this._children.push(node);
    }

    /**
     * @return token lexeme
     */
    public getLexeme(): Token | null {
        return this._lexeme;
    }


    get children(): ASTNode[] {
        return this._children;
    }

    set children(value: ASTNode[]) {
        this._children = value;
    }

    public print(level: number = 0): void {
        console.log(`${'\t'.repeat(level)}${this.label}`);
        this.children.forEach(child => child.print(level + 1));
    }
}
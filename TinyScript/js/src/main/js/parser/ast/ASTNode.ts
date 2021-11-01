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

    get label(): string | null {
        return this._label ?? null;
    }

    get type(): ASTNodeTypes | null {
        return this._type ?? null;
    }

    set lexeme(value: Token | null) {
        this._lexeme = value;
    }


    set label(value: string | null) {
        this._label = value;
    }

    set type(value: ASTNodeTypes | null) {
        this._type = value;
    }

    /**
     * get node by index
     * @param index
     * @return number
     */
    public getChildren(index: number | null): ASTNode | null {
        if (index == null) {
            return null
        }
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
}
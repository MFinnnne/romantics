import ASTNodeTypes from "./ASTNodeTypes";
import Token from "../../lexer/Token";

export default class ASTNode {

    protected children: ASTNode[] = []
    protected parent: ASTNode | null;
    private _lexeme: Token | undefined;
    private _label: string | null;
    private _type: ASTNodeTypes | null;


    constructor(parent: ASTNode | null, types: ASTNodeTypes | null, label: string | null) {
        this.parent = parent;
        this._label = label;
        this._type = types;
    }


    get lexeme(): Token | undefined {
        return this._lexeme;
    }

    get label(): string | null {
        return this._label;
    }

    get type(): ASTNodeTypes | null {
        return this._type;
    }

    set lexeme(value: Token | undefined) {
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
        return this._lexeme;
    }
}
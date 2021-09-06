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
        return this._lexeme;
    }
}
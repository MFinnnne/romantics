import ASTNode from "./ASTNode";

export class PriorityTable {

    private _table: Array<Array<string>> = [];

    constructor() {
        this._table.push(["&", "|", "^"]);
        this._table.push(["==", "!=", ">", "<", ">=", "<="]);
        this._table.push(["+", "-"]);
        this._table.push(["*", "/"]);
        this._table.push(["<<", ">>"]);
    }

    get table(): Array<Array<string>> {
        return this._table;
    }

    set table(value: Array<Array<string>>) {
        this._table = value;
    }
}
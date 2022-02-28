class LexicalException extends Error {
    constructor(msg: string) {
        super(msg);
    }

    static fromChar(c: string) {
        return new LexicalException(`unexpected char ${c}`);
    }
}

export default LexicalException;
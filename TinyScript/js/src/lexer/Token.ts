import TokenType from './TokenType';
mport PeekIterator from "../commons/PeekIterator";

/*
 * @Author: MFine
 * @Date: 2021-06-29 00:55:57
 * @LastEditTime: 2021-06-29 01:05:34
 * @LastEditors: MFine
 * @Description:
 */
export default class Token {
	private readonly _type: TokenType | null = null;
	private readonly _value: string | null = null;
	constructor(type: TokenType, value: string) {
		this._type = type;
		this._value = value;
	}

	get type() {
		return this._type;
	}

	isVariable() {
		return this._type == TokenType.VARIABLE;
	}

	isScalar() {
		return (
			this._type == TokenType.INTEGER ||
			this._type == TokenType.FLOAT ||
			this._type == TokenType.STRING ||
			this._type == TokenType.BOOLEAN
		);
	}
	static makeVarOrKeyword(it:PeekIterator<string>):Token{
		let s:string = "";
		while (it.hasNext()) {
			const lookahead:string|undefined = it.peek();
			if (lookahead){
				if (AlphabetHelper.isLiteral(lookahead)) {
					s += lookahead;
				} else {
					break;
				}
				it.next();
			}
		}
		if (KeyWords.isKeyword(s)) {
			return new Token(TokenType.KEYWORD, s);
		}
		if (s.equals("true") || s.equals("false")) {
			return new Token(TokenType.BOOLEAN, s);
		}
		return new Token(TokenType.VARIABLE, s);
	}




	toString() {
		return `type ${this._type},value ${this._value}`;
	}
}

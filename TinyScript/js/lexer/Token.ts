import TokenType from './TokenType';

/*
 * @Author: MFine
 * @Date: 2021-06-29 00:55:57
 * @LastEditTime: 2021-06-29 01:05:34
 * @LastEditors: MFine
 * @Description:
 */
export default class Token {
	_type: TokenType = null;
	_value: string = null;
	constructor(type, value) {
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

	toString() {
		return `type ${this._type},value ${this._value}`;
	}
}

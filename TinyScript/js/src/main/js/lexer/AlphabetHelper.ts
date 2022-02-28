export default class AlphabetHelper {

    private static ptnLetter = /^[a-zA-Z]$/
    private static ptnNumber = /^[0-9]$/
    private static ptnLiteral = /^[_a-zA-Z0-9]$/
    private static operator = /^[+\-*/><=!&|^%,;]$/

    static isLetter(c: string): boolean {
        return AlphabetHelper.ptnLetter.test(c);
    }

    static isNumber(c: string): boolean {
        return AlphabetHelper.ptnNumber.test(c);
    }

    static isLiteral(c: string): boolean {
        return AlphabetHelper.ptnLiteral.test(c);
    }

    static isOperator(c: string): boolean {
        return AlphabetHelper.operator.test(c);
    }
}
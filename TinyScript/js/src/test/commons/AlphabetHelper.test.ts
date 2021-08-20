import AlphabetHelper from "../../lexer/AlphabetHelper";

describe('testAlphabetHelper',()=>{

    test('char check',()=>{
        expect(AlphabetHelper.isLetter('a')).toEqual(true);
        expect(AlphabetHelper.isLetter('A')).toEqual(true);
        expect(AlphabetHelper.isLetter('z')).toEqual(true);
        expect(AlphabetHelper.isLetter('Z')).toEqual(true);
        expect(AlphabetHelper.isLetter('1')).toEqual(false);

        expect(AlphabetHelper.isLiteral('0')).toEqual(true);
        expect(AlphabetHelper.isLiteral('9')).toEqual(true);
        expect(AlphabetHelper.isLiteral('_')).toEqual(true);
        expect(AlphabetHelper.isLiteral('a')).toEqual(true);
        expect(AlphabetHelper.isLiteral('Z')).toEqual(true);
        expect(AlphabetHelper.isLiteral(',')).toEqual(false);

        expect(AlphabetHelper.isNumber('0')).toEqual(true);
        expect(AlphabetHelper.isNumber('9')).toEqual(true);
        expect(AlphabetHelper.isNumber('p')).toEqual(false);

        expect(AlphabetHelper.isOperator('+')).toEqual(true);
        expect(AlphabetHelper.isOperator('-')).toEqual(true);
        expect(AlphabetHelper.isOperator('*')).toEqual(true);
        expect(AlphabetHelper.isOperator('/')).toEqual(true);
        expect(AlphabetHelper.isOperator('>')).toEqual(true);
        expect(AlphabetHelper.isOperator('<')).toEqual(true);
        expect(AlphabetHelper.isOperator('=')).toEqual(true);
        expect(AlphabetHelper.isOperator('!')).toEqual(true);
        expect(AlphabetHelper.isOperator('&')).toEqual(true);
        expect(AlphabetHelper.isOperator('|')).toEqual(true);
        expect(AlphabetHelper.isOperator('^')).toEqual(true);
        expect(AlphabetHelper.isOperator('%')).toEqual(true);
        expect(AlphabetHelper.isOperator('8')).toEqual(false);
        expect(AlphabetHelper.isOperator('z')).toEqual(false);

    })
})
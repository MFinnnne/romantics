package commons;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/7/5 23:46
 **/
class AlphabetHelperTest {

    @Test
    public void test(){
        assertTrue(AlphabetHelper.isLetter('a'));
        assertFalse(AlphabetHelper.isLetter('*'));
        assertTrue(AlphabetHelper.isLetter('a'));
        assertTrue(AlphabetHelper.isLiteral('_'));
        assertTrue(AlphabetHelper.isLiteral('9'));
        assertFalse(AlphabetHelper.isLiteral('*'));
        assertFalse(AlphabetHelper.isLetter('*'));
        assertTrue(AlphabetHelper.isNumber('1'));
        assertTrue(AlphabetHelper.isNumber('9'));
        assertFalse(AlphabetHelper.isNumber('x'));
        assertTrue(AlphabetHelper.isOperator('&'));
        assertTrue(AlphabetHelper.isOperator('*'));
        assertTrue(AlphabetHelper.isOperator('+'));
        assertTrue(AlphabetHelper.isOperator('/'));
        assertTrue(AlphabetHelper.isOperator('='));
    }
}
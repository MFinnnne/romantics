package commons;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/7/1 0:00
 **/
class PeekIteratorTest {
    @Test
    void test_peek() {
        var source = "abcdefg";
        var it = new PeekIterator<>(source.chars().mapToObj(c -> (char) c));

        assertEquals('a', it.next());
        assertEquals('b', it.next());
        it.next();
        it.next();
        assertEquals('e', it.next());
        assertEquals('f', it.peek());
        assertEquals('f', it.peek());
        assertEquals('f', it.next());
        assertEquals('g', it.next());
    }

    @Test
    void testLookAhead() {
        var source = "abcdefg";
        var it = new PeekIterator<>(source.chars().mapToObj(c -> (char) c));
        assertEquals('a', it.next());
        assertEquals('b', it.next());
        it.putBack();
        it.putBack();
        assertEquals('a', it.next());
    }

    @Test
    void testEndToken() {
        var source = "abcdefg";
        var it = new PeekIterator<>(source.chars().mapToObj(c -> (char) c),(char)0);
        var i = 0;
        while (it.hasNext()) {
            if (i == 7) {
                Assertions.assertEquals((char) 0, it.next());
            } else {
                assertEquals(source.charAt(i++), it.next());
            }
        }
    }
}
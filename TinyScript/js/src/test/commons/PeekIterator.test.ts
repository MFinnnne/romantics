import arrayToGenerator from '../../commons/ArrayToGenerator'
import PeekIterator from '../../commons/PeekIterator'


describe("test PeekIterator", () => {

    test('test next', () => {
        const data = 'abcdefg'
        const it = new PeekIterator(arrayToGenerator([...data]))
        expect(it.next()).toEqual('a')
        expect(it.next()).toEqual('b')
        expect(it.next()).toEqual('c')
        expect(it.next()).toEqual('d')
        expect(it.next()).toEqual('e')
        expect(it.next()).toEqual('f')
        expect(it.next()).toEqual('g')
    })

    test('test pee', () => {
        const data = 'abcdefg'
        const it = new PeekIterator(arrayToGenerator([...data]))
        expect(it.next()).toEqual('a')
        it.peek()
        it.peek()
        expect(it.next()).toEqual('b')
    })

    test('test endToken', () => {
        const data = 'abcdefg'
        const it = new PeekIterator(arrayToGenerator([...data]), '\0')
        for (let i = 0; i < 8; i++) {
            if (i === 7) {
                expect(it.next()).toEqual('\0')
            } else {
                it.next()
            }
        }
    })

    test("test peek and next",()=>{
        const data = 'abcdefg'
        const it = new PeekIterator(arrayToGenerator([...data]))
        expect(it.next()).toEqual('a')
        expect(it.next()).toEqual('b')
        expect(it.next()).toEqual('c')
        it.peek();
        expect(it.next()).toEqual('d')
        expect(it.next()).toEqual('e')
    })
})

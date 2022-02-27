import LinkedList from 'ts-linked-list'
/*
 * @Author: MFine
 * @Date: 2021-07-01 01:00:39
 * @LastEditTime: 2021-07-02 00:35:15
 * @LastEditors: MFine
 * @Description:
 */
export default class PeekIterator<T> {
    private it: Iterator<T> | null = null
    private stackPutBacks: LinkedList<T> = new LinkedList()
    private queueCache: LinkedList<T> = new LinkedList()
    readonly CACHE_SIZE: number = 10
    private endToken: T | null = null

    constructor(it: Iterator<T>, endToken?: T | null) {
        this.it = it
        this.endToken = endToken ?? null
    }

    peek(): T | null {
        if (this.stackPutBacks.length > 0 && this.stackPutBacks.tail) {
            return this.stackPutBacks.tail.data
        }
        const next: T | null = this.next();
        next&&this.putBack()
        return next??null;
    }


    public putBack() {
        const val: T | undefined = this.queueCache.pop()
        val && this.stackPutBacks.append(val)
    }

    hasNext(): boolean {
        return this.endToken !== null || !!this.peek()
    }


    next(): T | null {
        let val: T | undefined
        if (this.stackPutBacks.length > 0) {
            val = this.stackPutBacks.pop()
        } else {
            val = this.it?.next().value
            if (!val && this.endToken != null) {
                const tmp: T = this.endToken;
                this.queueCache.append(tmp);
                this.endToken = null;
                return tmp;
            }
        }
        if (this.queueCache.length > this.CACHE_SIZE - 1) {
            this.queueCache.shift()
        }
        if (!val) {
            return val??null;
        }
        this.queueCache.append(val)
        return val
    }
}

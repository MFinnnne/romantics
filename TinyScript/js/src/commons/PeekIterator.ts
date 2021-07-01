import LinkedList from 'ts-linked-list'
/*
 * @Author: MFine
 * @Date: 2021-07-01 01:00:39
 * @LastEditTime: 2021-07-02 00:35:15
 * @LastEditors: MFine
 * @Description:
 */
export default class PeekIterator<T>{
	private it: Iterator<T> | null = null
	private stackPutBacks: LinkedList<T> = new LinkedList()
	private queueCache: LinkedList<T> = new LinkedList()
	readonly CACHE_SIZE: number = 10
	private endToken: T | null = null

	constructor(it: Iterator<T>, endToken?: T) {
		this.it = it
		this.endToken = endToken ?? null
	}

	peek() {
		if (this.stackPutBacks.length > 0) {
			return this.stackPutBacks.get(0)
		}
		if (!this.hasNext()) {
			return this.endToken
		}
		const next: T = this.it?.next().value
		this.putBack()
		return next
	}

	putBack() {
		const val: T | undefined = this.queueCache.pop()
		val && this.stackPutBacks.push(val)
	}

	hasNext(): boolean {
		return this.endToken !== null || !!this.peek()
	}


	next(): T | undefined {
		let val: T | undefined
		if (this.stackPutBacks.length > 0) {
			val = this.stackPutBacks.pop()
		} else {
			val = this.it?.next().value
		}
		if (this.queueCache.length > this.CACHE_SIZE - 1) {
			this.queueCache.shift()
		}
		val && this.queueCache.append(val)
		return val
	}
}

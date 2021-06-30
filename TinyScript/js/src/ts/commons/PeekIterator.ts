class PeekIterator<T> {
	private it:Iterator<T>|null = null
	constructor(it:Iterator<T>) {
    this.it = it
  }
}

package commons;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.stream.Stream;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/6/29 23:51
 **/
public class PeekIterator<T> implements Iterator<T> {

    private static final int CACHE_SIZE = 10;

    private final Iterator<T> it;

    private final LinkedList<T> queueCache = new LinkedList<>();
    private final LinkedList<T> stackPutBacks = new LinkedList<>();
    private T endToken = null;


    public PeekIterator(Stream<T> stream) {
        it = stream.iterator();
    }

    public PeekIterator(Stream<T> stream, T endToken) {
        it = stream.iterator();
        this.endToken = endToken;
    }

    public T peek() {
        if (this.stackPutBacks.size() > 0) {
            return this.stackPutBacks.getFirst();
        }
        if (!it.hasNext()) {
            return endToken;
        }
        T next = this.next();
        this.putBack();
        return next;
    }

    // 缓存：A->B->C->D
    // 放回：D->C->B->A

    public void putBack() {
        this.stackPutBacks.push(this.queueCache.pollLast());
    }

    @Override
    public boolean hasNext() {
        return this.endToken != null || !this.stackPutBacks.isEmpty()|| it.hasNext();
    }

    @Override
    public T next() {
        T val = null;
        if (!this.stackPutBacks.isEmpty()) {
            val = this.stackPutBacks.pop();
        } else {
            if (!this.it.hasNext()) {
                T tmp = this.endToken;
                this.endToken = null;
                return tmp;
            }
            val = it.next();
        }
        // 保存最近操作的10个
        while (queueCache.size() > CACHE_SIZE - 1) {
            queueCache.poll();
        }
        queueCache.add(val);
        return val;
    }
}

export class Stack<T> {
    public storage: T[] = []

    push(item: T) {
        this.storage.push(item)
    }

    pop() {
        return this.storage.pop()
    }

    peek() {
        return this.storage[this.storage.length - 1]
    }

    isEmpty() {
        return this.storage.length === 0
    }

    get length() {
        return this.storage.length
    }

    clear() {
        this.storage = []
    }
}
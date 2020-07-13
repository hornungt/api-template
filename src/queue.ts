// Represent a queue object. Written for simple testing purposes. Will remove later
export class Queue {

    private head: Node;
    private tail: Node;
    private size: number;

    constructor() {
        this.head = this.tail = undefined;
        this.size = 0;
    }

    enqueue(value: any): void {
        const next: Node = { next: null, value };
        if (this.size === 0) {
            this.head = this.tail = next;
        }
        else {
            this.tail.next = next;
            this.tail = this.tail.next;
        }
        this.size++;
    }

    dequeue(): any {
        const res = this.head;
        this.head = this.head?.next;
        if (!this.head) {
            this.tail = null;
            this.size = 0;
        }
        else {
            this.size--;
        }
        return res?.value;
    }

    getSize(): number {
        return this.size;
    }
}

interface Node {
    next: Node;
    value: any;
}
import { RawEv3nt } from '../models/event';
import { Milliseconds, Pixels } from '../constants';
export declare function prepareEvent(event: RawEv3nt, pixelsPerMillisecond: Pixels): RawEv3nt;
declare class Node {
    value: RawEv3nt;
    left: Node;
    right: Node;
    constructor(value: RawEv3nt);
}
export declare class BinarySearchTree {
    private events;
    private root;
    constructor(events: RawEv3nt[]);
    buildTree(root: Node, start: number, end: number): Node;
    first(): Node;
    last(): Node;
    findAdjacent(timestamp: Milliseconds): Node;
}
export default function orderEvents2(events: RawEv3nt[], pixelsPerMillisecond: Pixels): void;
export {};

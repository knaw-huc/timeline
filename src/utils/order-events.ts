import { RawEv3nt } from '../models/event'
import { PIXELS_PER_LETTER, EVENT_HEIGHT, Milliseconds, EVENT_ROW_HEIGHT, Pixels } from '../constants';

class Node {
	left: Node
	right: Node
	constructor(public value: RawEv3nt) {}
}
export class BinarySearchTree {
	private root: Node

	constructor(private events: RawEv3nt[]) {
		this.buildTree(this.root, 0, events.length - 1)
	}	

	buildTree(root: Node, start: number, end: number) {
		if (end - start < 0) return
		const nextEventIndex = start + Math.floor((end - start) / 2)

		const nextEvent = this.events[nextEventIndex]
		const nextNode = new Node(nextEvent)
		if (root == null) this.root = nextNode

		nextNode.left = this.buildTree(nextNode, start, nextEventIndex - 1)
		nextNode.right = this.buildTree(nextNode, nextEventIndex + 1, end)

		return nextNode
	}

	first() {
		let currentNode = this.root
		while (currentNode) {
			if (currentNode.left == null) break
			currentNode = currentNode.left
		}
		return currentNode
	}

	last() {
		let currentNode = this.root
		while (currentNode) {
			if (currentNode.right == null) break
			currentNode = currentNode.right
		}
		return currentNode
	}

	findAdjacent(timestamp: Milliseconds) {
		let currentNode = this.root

		while (currentNode != null) {
			if (timestamp < currentNode.value.from) {
				if (currentNode.left == null) break
				currentNode = currentNode.left
			} else {
				if (currentNode.right == null) {
					if (timestamp === currentNode.value.to) currentNode = null
					break
				}
				currentNode = currentNode.right
			}
		}

		return currentNode
	}
}

export default function orderEvents2(events: RawEv3nt[], pixelsPerMillisecond: Pixels) {
	events
	pixelsPerMillisecond
}
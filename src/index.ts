class DNode {
	#name: string;
	#x: number;
	#y: number;
	#dist: number;
	#isStarting: boolean;
	#isEnding: boolean;
	constructor(
		name: string, 
		xc: number, 
		yc: number, 
		dist: number = Infinity, 
		starting: boolean = false, 
		ending: boolean = false
	) {
		this.#name = name;
		this.#x = xc;
		this.#y = yc;
		this.#dist = dist;
		this.#isStarting = starting;
		this.#isEnding = ending;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get name() {
		return this.#name;
	}
	get dist() {
		return this.#dist;
	}
	get isStarting() {
		return this.#isStarting;
	}
	get isEnding() {
		return this.#isEnding;
	}
	set dist(d) {
		this.#dist = d;
	}
	set set_x(new_x: number) {
		this.#x = new_x;
	}
	set set_y(new_y: number) {
		this.#y = new_y;
	}
};
class Edge {
	#node1: DNode;
	#node2: DNode;
	#weight: number;
	#color: string;
	constructor(node1: DNode, node2: DNode, weight: number) {
		this.#node1 = node1;
		this.#node2 = node2;
		this.#weight = weight;
		this.#color = 'black';
	}
	get weight() {
		return this.#weight;
	}
	get node1() {
		return this.#node1;
	}
	get node2() {
		return this.#node2;
	}
	get color() {
		return this.#color;
	}
	set color(col) {
		this.#color = col;
	}
};
class PriorityQueue {
	#queue: Array<DNode>;
	constructor() {
		this.#queue = [];
	}
	get top() {
		return this.#queue[0];
	}
	pop() {
		this.#queue.shift();
	}
	insert(val: DNode) {
		this.#queue.push(val);
		let i = this.#queue.length - 1;
		let j = i % 2 === 0 ? Math.floor(i/2) - 1 : Math.floor(i/2);
		while (i > 0 && this.#queue[i].dist < this.#queue[j].dist) {
			let t = this.#queue[i];
			this.#queue[i] = this.#queue[j];
			this.#queue[j] = t;
			i = i % 2 === 0 ? Math.floor(i/2) - 1 : Math.floor(i/2);
			j = i % 2 === 0 ? Math.floor(i/2) - 1 : Math.floor(i/2);
		}
	}
	decrease_prio(name: string, p: number) {
		for (let n = 0; n < this.#queue.length; n++) {
			if (this.#queue[n].name === name) {
				let node = this.#queue[n];
				this.#queue.splice(n, 1);
				node.dist = p;
				this.insert(node);
				break;
			}
		}
	}
	get length() {
		return this.#queue.length;
	}
};
let cvs = document.getElementById('canvas');
let ctx = (cvs as HTMLCanvasElement).getContext('2d');

(cvs as HTMLCanvasElement).width = window.innerWidth;
(cvs as HTMLCanvasElement).height = window.innerHeight;
(cvs as HTMLCanvasElement).style.position = 'absolute';
(cvs as HTMLCanvasElement).style.zIndex = '0';
(cvs as HTMLCanvasElement).style.top = '0';
(cvs as HTMLCanvasElement).style.left = '0';

let addButton = document.getElementById('add');
let deleteButton = document.getElementById('delete');
let connectButton = document.getElementById('connect');
let moveButton = document.getElementById('move');

let mode: number;

function add() {
	mode ? (mode = 0):(mode = 1);
	document.body.style.cursor = 'crosshair';
}

function deleteNode() {
	mode ? (mode = 0):(mode = 2);
	document.body.style.cursor = 'pointer';
}

function connect() {
	mode ? (mode = 0):(mode = 3);
	document.body.style.cursor = 'pointer';
}

function moveMode() {
	mode ? (mode = 0):(mode = 4);
	document.body.style.cursor = 'grab';
}

addButton.onclick = add;
addButton.ontouchstart = add;

deleteButton.onclick = deleteNode;
deleteButton.ontouchstart = deleteNode;

connectButton.onclick = connect;
connectButton.ontouchstart = connect;

moveButton.onclick = moveMode;
moveButton.ontouchstart = moveMode;

let mousedown = false;
let nodes: Array<DNode> = [];
let edges: Array<Edge> = [];
let nodeMoving: DNode | null = null;

cvs.onmousedown = function(e) {
	if (mode === 4) {
		mousedown = true;
		for (let i = 0; i < nodes.length; i++) {
			let node = nodes[i];
			if (
				node.x <= e.offsetX + 20 && 
				node.x >= e.offsetX - 20 && 
				node.y <= e.offsetY + 20 &&
				node.y >= e.offsetY - 20
				) {
					nodeMoving = node;
					break;
			}
		}
	}
}

cvs.onmousemove = function(e) {
	if (mousedown && nodeMoving !== null && moveMode) {
		nodeMoving.set_x = e.offsetX;
		nodeMoving.set_y = e.offsetY;
	}
}

cvs.onmouseup = function(e) {
	mousedown = false;
	nodeMoving = null;
}

function dijkstra() {
	let prioq = new PriorityQueue();
	let weights = new Map();
	let connections = new Map();
	let paths = new Map();
	// we are passing in or pushing in the actual objects so that the objects share memory so that if we change one node's dist
	// they all change no matter what list they are in.
	for (let e = 0; e < edges.length; e++) {
		let edge = edges[e];
		weights.set(edge.node1.name + '+' + edge.node2.name, edge.weight);
		weights.set(edge.node2.name + '+' + edge.node1.name, edge.weight);

		if (connections.has(edge.node1.name) === false) {
			connections.set(edge.node1.name, [edge.node2]);
		}
		else {
			connections.get(edge.node1.name).push(edge.node2);
		}

		if (connections.has(edge.node2.name) === false) {
			connections.set(edge.node2.name, [edge.node1]);
		}
		else {
			connections.get(edge.node2.name).push(edge.node1);
		}
	}

	for (let n = 0; n < nodes.length; n++) {
		prioq.insert(nodes[n]);
	}

	while (prioq.length > 0) {
		let min = prioq.top;
		prioq.pop();
		for (let c = 0; c < connections.get(min.name).length; c ++) {
			// connection.dist was not changing because I was creating copies of the node,
			// not passing it in directly in terms of memory location
			let connection = connections.get(min.name)[c];
			if (
				connection.dist > weights.get(connection.name + '+' + min.name) + min.dist
			) {
				prioq.decrease_prio(connection.name, weights.get(connection.name + '+' + min.name) + min.dist);
				connection.dist = Math.min(connection.dist, weights.get(connection.name + '+' + min.name) + min.dist);
				paths.set(connection.name, min.name);
			}
		}
	}

	let answer = '';
	let endNode = nodes.find(node => node.isEnding);
	for (let path of paths) {
		let path_str = [];
		let n_str = path[0];
		while (n_str !== endNode.name) {
			path_str.push(n_str);
			n_str = paths.get(n_str);
		}
		path_str.push(endNode.name);
	}
}

function draw() {
	ctx.clearRect(0, 0, (cvs as HTMLCanvasElement).width, (cvs as HTMLCanvasElement).height);
	ctx.font = '10px sans-serif';
	ctx.strokeStyle = 'black';
	nodes.forEach(node => {
		ctx.beginPath();
		ctx.fillText(node.name, node.x , node.y);
		ctx.stroke();
	});
	edges.forEach(edge => {
		ctx.beginPath();
		ctx.moveTo(edge.node1.x, edge.node1.y);
		ctx.font = 'bold 25px serif';
		ctx.strokeStyle = edge.color;
		ctx.fillText(
			String(edge.weight), 
			edge.node1.x + Math.floor((edge.node2.x - edge.node1.x)/2) + 10, 
			edge.node1.y + Math.floor((edge.node2.y - edge.node1.y)/2) + 10
		);
		ctx.lineTo(edge.node2.x, edge.node2.y);
		ctx.stroke();
	});
	requestAnimationFrame(draw);
};
draw();

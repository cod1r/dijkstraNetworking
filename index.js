class Node {
	#name;
	#x;
	#y;
	#dist;
	constructor(name, dist = Infinity) {
		this.#name = name;
		this.#x = window.innerWidth/2;
		this.#y = window.innerHeight/2;
		this.#dist = dist;
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
	set dist(d) {
		this.#dist = d;
	}
	set set_x(new_x) {
		this.#x = new_x;
	}
	set set_y(new_y) {
		this.#y = new_y;
	}
};
class Edge {
	#node1;
	#node2;
	#weight;
	#color;
	constructor(node1, node2, weight) {
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
	#queue;
	constructor() {
		this.#queue = [];
	}
	get top() {
		return this.#queue[0];
	}
	pop() {
		this.#queue.shift();
	}
	insert(val) {
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
	decrease_prio(name, p) {
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

let input = document.getElementById('in');
let input_x = document.getElementById('x_in');
let input_y = document.getElementById('y_in');
let err = document.getElementById('error');
let error_2 = document.getElementById('error_2');
let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');
let connect_1 = document.getElementById('connect_1');
let connect_2 = document.getElementById('connect_2');
let weight = document.getElementById('weight');
let dijkstra_input = document.getElementById("dijkstra");
let dijkstra_answer = document.getElementById('dijkstra-answer');
let error_3 = document.getElementById('error_3');
let mousedown = false;
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
cvs.lineWidth = 1;
cvs.onmousedown = (e) => {
	mousedown = true;
};
cvs.onmousemove = (e) => {
	if (mousedown) {
		for (let i = 0; i < nodes.length; i++) {
			let node = nodes[i];
			if (
				node.x <= e.pageX + 20 && 
				node.x >= e.pageX - 20 && 
				node.y <= e.pageY + 20 &&
				node.y >= e.pageY - 20
			) {
				node.set_x = e.pageX;
				node.set_y = e.pageY;
				break;
			}
		}
	}
};
cvs.onmouseup = (e) => {
	mousedown = false;
};
let nodes = [];
let edges = [];

let clearEverything = () => {
	nodes = [];
	edges = [];
	dijkstra_answer.value = '';
};

let deleteNode = () => {
	if (
		input.value.length === 0 ||
		nodes.filter(node => node.name === input.value).length === 0
	) {
		err.innerHTML = 'node name to delete is empty or no nodes with that name exist';
		return;
	}
	err.innerHTML = '';
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].name === input.value.trim()) {
			nodes.splice(i, 1);
			for (let i = 0; i < edges.length; i++) {
				if (edges[i].node1.name === input.value.trim() || edges[i].node2.name === input.value.trim()) {
					edges.splice(i, 1);
					break;
				}
			}
			break;
		}
	}
};

let addNode = () => {
	if (
		input.value.length === 0 || 
		input.value.length > 3 ||
		nodes.filter(node => node.name === input.value).length > 0
	) {
		err.innerHTML = 'some fields are empty or the node name already exists or node name is too long';
		return;
	}
	err.innerHTML = '';
	nodes.push(new Node(input.value.trim()));
};

let connectNodes = () => {
	if (
		nodes.filter(node => node.name === connect_2.value.trim()).length === 0 ||
		nodes.filter(node => node.name === connect_1.value.trim()).length === 0 || 
		nodes.length === 0 || 
		connect_1.value.length === 0 || 
		connect_2.value.length === 0 ||
		weight.value.length === 0 ||
		edges.filter(
			edge => 
				edge.node1.name === connect_2.value.trim() && edge.node2.name === connect_1.value.trim() || 
				edge.node2.name === connect_2.value.trim() && edge.node1.name === connect_1.value.trim()
		).length > 0
	) {
		error_2.innerHTML = 'no weight specified or no nodes or two node names were not given or one of the node names does not exist or edge already exists';
		return;
	}
	error_2.innerHTML = '';
	let node1;
	let node2;
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].name === connect_1.value.trim()) {
			node1 = nodes[i];
			break;
		}
	}
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].name === connect_2.value.trim()) {
			node2 = nodes[i];
			break;
		}
	}
	edges.push(new Edge(node1, node2, parseInt(weight.value)));
};

let dijkstra = () => { 
	if (
		dijkstra_input.value.length === 0 ||
		nodes.filter(node => node.name === dijkstra_input.value).length === 0 ||
		edges.length === 0
	) {
		error_3.innerHTML = 'no edges or either no starting node provided or no such node exists';
		return;
	}
	error_2.innerHTML = '';
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
		let node = nodes[n];
		if (node.name === dijkstra_input.value.trim()) {
			prioq.insert(new Node(node.name, 0));
		}
		else {
			prioq.insert(node);
		}
	}

	let visited = new Set();

	while (prioq.length > 0) {
		let min = prioq.top;
		prioq.pop();
		for (let c = 0; c < connections.get(min.name).length; c ++) {
			// connection.dist was not changing because I was creating copies of the node,
			// not passing it in directly in terms of memory location
			let connection = connections.get(min.name)[c];
			if (
				connection.dist > weights.get(connection.name + '+' + min.name) + min.dist && 
				visited.has(connection.name) === false
			) {
				prioq.decrease_prio(connection.name, weights.get(connection.name + '+' + min.name) + min.dist);
				connection.dist = Math.min(connection.dist, weights.get(connection.name + '+' + min.name) + min.dist);
				paths.set(connection.name, min.name);
			}
		}
		visited.add(min.name);
	}

	let answer = '';
	for (let path of paths) {
		let path_str = [];
		let n_str = path[0];
		while (n_str !== dijkstra_input.value.trim()) {
			path_str.push(n_str);
			n_str = paths.get(n_str);
		}
		path_str.push(dijkstra_input.value.trim());
		answer += path_str.reverse().join('->') + '\n';
	}
	dijkstra_answer.value = answer;

};

let draw = () => {
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	ctx.font = '10px sans-serif';
	ctx.strokeStyle = 'black';
	nodes.forEach(node => {
		ctx.beginPath();
		ctx.arc(node.x, node.y, 20, 0, 2*Math.PI);
		ctx.fillText(node.name, node.x - 20, node.y - 20);
		ctx.stroke();
	});
	edges.forEach(edge => {
		ctx.beginPath();
		ctx.moveTo(edge.node1.x, edge.node1.y);
		ctx.font = 'bold 25px serif';
		ctx.strokeStyle = edge.color;
		ctx.fillText(
			edge.weight, 
			edge.node1.x + Math.floor((edge.node2.x - edge.node1.x)/2) + 10, 
			edge.node1.y + Math.floor((edge.node2.y - edge.node1.y)/2) + 10
		);
		ctx.lineTo(edge.node2.x, edge.node2.y);
		ctx.stroke();
	});
	requestAnimationFrame(draw);
};
draw();

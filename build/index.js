function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
}
function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldInit(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var _name = /*#__PURE__*/ new WeakMap(), _x = /*#__PURE__*/ new WeakMap(), _y = /*#__PURE__*/ new WeakMap(), _dist = /*#__PURE__*/ new WeakMap(), _isStarting = /*#__PURE__*/ new WeakMap(), _isEnding = /*#__PURE__*/ new WeakMap();
var DNode = /*#__PURE__*/ function() {
    "use strict";
    function DNode(name, xc, yc) {
        var dist = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Infinity, starting = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false, ending = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
        _classCallCheck(this, DNode);
        _classPrivateFieldInit(this, _name, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _x, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _y, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _dist, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _isStarting, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _isEnding, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _name, name);
        _classPrivateFieldSet(this, _x, xc);
        _classPrivateFieldSet(this, _y, yc);
        _classPrivateFieldSet(this, _dist, dist);
        _classPrivateFieldSet(this, _isStarting, starting);
        _classPrivateFieldSet(this, _isEnding, ending);
    }
    _createClass(DNode, [
        {
            key: "x",
            get: function get() {
                return _classPrivateFieldGet(this, _x);
            }
        },
        {
            key: "y",
            get: function get() {
                return _classPrivateFieldGet(this, _y);
            }
        },
        {
            key: "name",
            get: function get() {
                return _classPrivateFieldGet(this, _name);
            }
        },
        {
            key: "dist",
            get: function get() {
                return _classPrivateFieldGet(this, _dist);
            },
            set: function set(d) {
                _classPrivateFieldSet(this, _dist, d);
            }
        },
        {
            key: "isStarting",
            get: function get() {
                return _classPrivateFieldGet(this, _isStarting);
            }
        },
        {
            key: "isEnding",
            get: function get() {
                return _classPrivateFieldGet(this, _isEnding);
            }
        },
        {
            key: "set_x",
            set: function set(new_x) {
                _classPrivateFieldSet(this, _x, new_x);
            }
        },
        {
            key: "set_y",
            set: function set(new_y) {
                _classPrivateFieldSet(this, _y, new_y);
            }
        }
    ]);
    return DNode;
}();
var _node1 = /*#__PURE__*/ new WeakMap(), _node2 = /*#__PURE__*/ new WeakMap(), _weight = /*#__PURE__*/ new WeakMap(), _color = /*#__PURE__*/ new WeakMap();
var Edge = /*#__PURE__*/ function() {
    "use strict";
    function Edge(node1, node2, weight) {
        _classCallCheck(this, Edge);
        _classPrivateFieldInit(this, _node1, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _node2, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _weight, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldInit(this, _color, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _node1, node1);
        _classPrivateFieldSet(this, _node2, node2);
        _classPrivateFieldSet(this, _weight, weight);
        _classPrivateFieldSet(this, _color, 'black');
    }
    _createClass(Edge, [
        {
            key: "weight",
            get: function get() {
                return _classPrivateFieldGet(this, _weight);
            }
        },
        {
            key: "node1",
            get: function get() {
                return _classPrivateFieldGet(this, _node1);
            }
        },
        {
            key: "node2",
            get: function get() {
                return _classPrivateFieldGet(this, _node2);
            }
        },
        {
            key: "color",
            get: function get() {
                return _classPrivateFieldGet(this, _color);
            },
            set: function set(col) {
                _classPrivateFieldSet(this, _color, col);
            }
        }
    ]);
    return Edge;
}();
var _queue = /*#__PURE__*/ new WeakMap();
var PriorityQueue = /*#__PURE__*/ function() {
    "use strict";
    function PriorityQueue() {
        _classCallCheck(this, PriorityQueue);
        _classPrivateFieldInit(this, _queue, {
            writable: true,
            value: void 0
        });
        _classPrivateFieldSet(this, _queue, []);
    }
    var _proto = PriorityQueue.prototype;
    _proto.pop = function pop() {
        _classPrivateFieldGet(this, _queue).shift();
    };
    _proto.insert = function insert(val) {
        _classPrivateFieldGet(this, _queue).push(val);
        var i = _classPrivateFieldGet(this, _queue).length - 1;
        var j = i % 2 === 0 ? Math.floor(i / 2) - 1 : Math.floor(i / 2);
        while(i > 0 && _classPrivateFieldGet(this, _queue)[i].dist < _classPrivateFieldGet(this, _queue)[j].dist){
            var t = _classPrivateFieldGet(this, _queue)[i];
            _classPrivateFieldGet(this, _queue)[i] = _classPrivateFieldGet(this, _queue)[j];
            _classPrivateFieldGet(this, _queue)[j] = t;
            i = i % 2 === 0 ? Math.floor(i / 2) - 1 : Math.floor(i / 2);
            j = i % 2 === 0 ? Math.floor(i / 2) - 1 : Math.floor(i / 2);
        }
    };
    _proto.decrease_prio = function decrease_prio(name, p) {
        for(var n = 0; n < _classPrivateFieldGet(this, _queue).length; n++){
            if (_classPrivateFieldGet(this, _queue)[n].name === name) {
                var node = _classPrivateFieldGet(this, _queue)[n];
                _classPrivateFieldGet(this, _queue).splice(n, 1);
                node.dist = p;
                this.insert(node);
                break;
            }
        }
    };
    _createClass(PriorityQueue, [
        {
            key: "top",
            get: function get() {
                return _classPrivateFieldGet(this, _queue)[0];
            }
        },
        {
            key: "length",
            get: function get() {
                return _classPrivateFieldGet(this, _queue).length;
            }
        }
    ]);
    return PriorityQueue;
}();
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
cvs.style.position = 'absolute';
cvs.style.zIndex = '0';
cvs.style.top = '0';
cvs.style.left = '0';
var addButton = document.getElementById('add');
var deleteButton = document.getElementById('delete');
var connectButton = document.getElementById('connect');
var moveButton = document.getElementById('move');
var mode;
function add() {
    mode ? mode = 0 : mode = 1;
}
function deleteNode() {
    mode ? mode = 0 : mode = 2;
}
function connect() {
    mode ? mode = 0 : mode = 3;
}
function moveMode() {
    mode ? mode = 0 : mode = 4;
}
addButton.onclick = add;
addButton.ontouchstart = add;
deleteButton.onclick = deleteNode;
deleteButton.ontouchstart = deleteNode;
connectButton.onclick = connect;
connectButton.ontouchstart = connect;
moveButton.onclick = moveMode;
moveButton.ontouchstart = moveMode;
var mousedown = false;
var nodes = [];
var edges = [];
var nodeMoving = null;
cvs.onmousedown = function(e) {
    if (mode === 4) {
        mousedown = true;
        for(var i = 0; i < nodes.length; i++){
            var node = nodes[i];
            if (node.x <= e.offsetX + 20 && node.x >= e.offsetX - 20 && node.y <= e.offsetY + 20 && node.y >= e.offsetY - 20) {
                nodeMoving = node;
                break;
            }
        }
    }
};
cvs.onmousemove = function(e) {
    if (mousedown && nodeMoving !== null && moveMode) {
        nodeMoving.set_x = e.offsetX;
        nodeMoving.set_y = e.offsetY;
    }
};
cvs.onmouseup = function(e) {
    mousedown = false;
    nodeMoving = null;
};
function dijkstra() {
    var prioq = new PriorityQueue();
    var weights = new Map();
    var connections = new Map();
    var paths = new Map();
    // we are passing in or pushing in the actual objects so that the objects share memory so that if we change one node's dist
    // they all change no matter what list they are in.
    for(var e = 0; e < edges.length; e++){
        var edge = edges[e];
        weights.set(edge.node1.name + '+' + edge.node2.name, edge.weight);
        weights.set(edge.node2.name + '+' + edge.node1.name, edge.weight);
        if (connections.has(edge.node1.name) === false) {
            connections.set(edge.node1.name, [
                edge.node2
            ]);
        } else {
            connections.get(edge.node1.name).push(edge.node2);
        }
        if (connections.has(edge.node2.name) === false) {
            connections.set(edge.node2.name, [
                edge.node1
            ]);
        } else {
            connections.get(edge.node2.name).push(edge.node1);
        }
    }
    for(var n = 0; n < nodes.length; n++){
        prioq.insert(nodes[n]);
    }
    while(prioq.length > 0){
        var min = prioq.top;
        prioq.pop();
        for(var c = 0; c < connections.get(min.name).length; c++){
            // connection.dist was not changing because I was creating copies of the node,
            // not passing it in directly in terms of memory location
            var connection = connections.get(min.name)[c];
            if (connection.dist > weights.get(connection.name + '+' + min.name) + min.dist) {
                prioq.decrease_prio(connection.name, weights.get(connection.name + '+' + min.name) + min.dist);
                connection.dist = Math.min(connection.dist, weights.get(connection.name + '+' + min.name) + min.dist);
                paths.set(connection.name, min.name);
            }
        }
    }
    var answer = '';
    var endNode = nodes.find(function(node) {
        return node.isEnding;
    });
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var path = _step.value;
            var path_str = [];
            var n_str = path[0];
            while(n_str !== endNode.name){
                path_str.push(n_str);
                n_str = paths.get(n_str);
            }
            path_str.push(endNode.name);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.font = '10px sans-serif';
    ctx.strokeStyle = 'black';
    nodes.forEach(function(node) {
        ctx.beginPath();
        ctx.fillText(node.name, node.x, node.y);
        ctx.stroke();
    });
    edges.forEach(function(edge) {
        ctx.beginPath();
        ctx.moveTo(edge.node1.x, edge.node1.y);
        ctx.font = 'bold 25px serif';
        ctx.strokeStyle = edge.color;
        ctx.fillText(String(edge.weight), edge.node1.x + Math.floor((edge.node2.x - edge.node1.x) / 2) + 10, edge.node1.y + Math.floor((edge.node2.y - edge.node1.y) / 2) + 10);
        ctx.lineTo(edge.node2.x, edge.node2.y);
        ctx.stroke();
    });
    requestAnimationFrame(draw);
}
draw();


//# sourceMappingURL=index.js.map
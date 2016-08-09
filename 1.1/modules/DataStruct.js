<<<<<<< HEAD
/**
 * @module DataStruct
 * @description Data structures
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @requires DOM
 * @requires Maths
 * @requires Files
 * @namespace
 * @type {{name: string, version: number, run: DataStruct.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports DataStruct
 */
var DataStruct = {
    name: "DataStruct",
    version: 1,
    run: function () {

    },
    description: "Data structures",
    dependency: ["DOM", "Maths", "Files"],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    DataStruct.complete = true;
})();

/* eslint no-undef: 0 */

/**
 * @description Linked list
 * @param {*} [pl=1] Payload
 * @param {LinkedList} [nx={payload: 1, next: null}] Next
 * @param {string} name Name of the linked list
 * @returns {LinkedList} Linked list
 * @this LinkedList
 * @constructor
 * @since 1.0
 */
function LinkedList (pl, nx, name) {
    this.payload = pl || 1;
    this.next = nx || {payload: 1, next: null};
    this.next.show = function () {
        return this.name + ":" + this.next.payload + "->"
    };
    this.name = name;
    this.show = function () {
        return this.name + ":" + this.payload + "->" + this.next.show()
    };

    this.toString = function () {
        return "LinkedList(" + this.show() + ")"
    };
    return this
}

/**
 * @description Binary tree node
 * @param {*} [pl=0] Payload
 * @param {TreeNode} [l] Left child
 * @param {TreeNode} [r] Right child
 * @this TreeNode
 * @returns {TreeNode} Tree node
 * @interface
 * @constructor
 * @since 1.0
 */
function TreeNode (pl, l, r) { //Binary tree
    this.left = l;
    this.right = r;
    this.payload = pl || 0;

    this.add = function (l, r) {
        this.left = l;
        this.right = r;
    };
    this.addLeft = function (childs) {
        for (var i = 0; i < childs.length; i++) {
            if (i === 0) this.left = childs[0];
            else childs[i - 1].left = childs[i];
        }
    };
    this.addRight = function (childs) {
        for (var i in childs) {
            if(childs.hasOwnProperty(i)) {
                if (i === 0) this.right = childs[0];
                else childs[i-1].right = childs[i];
            }
        }
    };
    this.traverse = function () {
        if (this.left) this.left.traverse();
        if (this.right) this.right.traverse();
        return this
    };
    //Console printing
    this.printInOrder = function () {
        if (this.left) this.left.printInOrder();
        Essence.addToPrinter(this.payload + "->");
        if (this.right) this.right.printInOrder();
        Essence.addToPrinter("\r\n");
    };
    this.printPreOrder = function () {
        Essence.addToPrinter(this.payload + "->");
        if (this.left) this.left.printPreOrder();
        if (this.right) this.right.printPreOrder();
        Essence.addToPrinter("\r\n")
    };
    this.printPostOrder = function () {
        if (this.left) this.left.printPreOrder();
        if (this.right) this.right.printPreOrder();
        Essence.addToPrinter(this.payload + "->");
        Essence.addToPrinter("\r\n")
    };
    //Window printing
    this.inOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        if (this.left) this.left.inOrder(t + s, s, d + 1, sym);
        println(t + sym + this.payload + s+" (deepth = " + d+")");
        if (this.right) this.right.inOrder(t + s, s, d + 1, sym);
    };
    this.preOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        println(t + sym + this.payload + s+" (deepth = " + d+")");
        if (this.left) this.left.preOrder(t + s, s, d + 1, sym);
        if (this.right) this.right.preOrder(t + s, s, d + 1, sym)
    };
    this.postOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        if (this.left) this.left.postOrder(t + s, s, d + 1, sym);
        if (this.right) this.right.postOrder(t + s, s, d + 1, sym);
        println(t + sym + this.payload + s+" (deepth = " + d+")")
    };

    //Getter
    this.getInOrder = function (sym) {
        if (!sym) sym = "->";
        var order = "";

        if (this.left) order += this.left.getInOrder(sym);
        order += sym + this.payload;
        if (this.right) order += this.right.getInOrder(sym);
        return order
    };
    this.getPreOrder = function (sym) {
        if (!sym) sym = "->";
        var order = "";

        order += sym + this.payload;
        if (this.left) order += this.left.getPreOrder(sym);
        if (this.right) order += this.right.getPreOrder(sym);
        return order
    };
    this.getPostOrder = function (sym) {
        if (!sym) sym = "->";
        var order = "";

        if (this.left) order += this.left.getPostOrder(sym);
        if (this.right) order += this.right.getPostOrder(sym);
        return order + sym + this.payload
    };
    this.isLeaf = function () { //Is it an end of branch ?
        return !this.left && !this.right
    };
    this.find = function (n, method) {
        return (method.normal() === "bfs")? this.bfs(n): this.dfs(n)
    };
    this.dfs = function (n, d, td) { //Depth First Search
        if (!d) d = 0; //Depth
        if (!td) td = 0; //Total depth
        var stack = [];
        stack.push(this);
        while (stack != []) {
            d = 0;
            var cur = stack.pop();
            try {
                if (cur.payload === n) return [d, td]
            } catch (e) {
                return [-1, td]
            }
            if (cur.left) stack.push(cur.left);
            if (cur.right) stack.push(cur.right);
            d++;
            td++;
        }
    };
    this.bfs = function (n, b, tb) { //Breadth First Search
        if (!b) b = 0; //Breadth
        if (!tb) tb = 0; //Total breadth
        var queue = [];
        queue.unshift(this); //Add as the end
        while (queue != []) {
            b = 0;
            var cur = queue.pop(); //Get the first element of the queue
            try {
                if (cur.payload === n) return [b, tb]
            } catch(e) {
                return [-1, tb]
            }
            if (cur.left) queue.unshift(cur.left);
            if (cur.right) queue.unshift(cur.right);
            b++;
            tb++;
        }
    };
    this.sum = function () {
        var s = this.payload;
        if (this.left) s += this.left.sum();
        if (this.right) s += this.right.sum();
        return s
    };
    this.min = function () {
        var m = this.payload;
        if (this.left) m = Math.min(m, this.left.min());
        if (this.right) m = Math.min(m, this.right.min());
        return m
    };
    this.max = function () {
        var m = this.payload;
        if (this.left) m = Math.max(m, this.left.max());
        if (this.right) m = Math.max(m, this.right.max());
        return m
    };
    this.nbOfBranches = function (n) {
        if (!n) n = 0;
        if (this.left) n = this.left.nbOfBranches(n + 1);
        if (this.right) n = this.right.nbOfBranches(n + 1);
        return n
    };
    this.avg = function () {
        return this.sum()/this.nbOfBranches()
    };
    this.printBFS = function (sym) {
        if (!sym) sym = "->";
        var queue = [], res = "";
        queue.unshift(this); //Add as the end
        while (queue!=[]) {
            var cur = queue.pop(); //Get the first element of the queue
            res += cur + sym;
            try {
                if (cur.left) queue.unshift(cur.left);
                if (cur.right) queue.unshift(cur.right);
            } catch(e) {
                Essence.say(e + " caused " + this + ".printBFS(" + sym + ") to go wrong", "err");
            }
        }
        return sym
    };
    this.toString = function () {
        /* Essence.txt2print = "";
         this.printInOrder();
         return "Tree(" + Essence.txt2print + ")" */
        var str = "TreeNode(payload = " + this.payload + ", ";
        if (this.left) str += "left = " + this.left.toString();
        if (this.right) str += "right = " + this.right.toString();
        return str.substring(0, str.length) + ")"
    };
    this.toArray = function (singly) {
        var arr = [];
        if (this.left) singly? arr.push(this.left.toArray().toString().split(",")): arr.push(this.left.toArray());
        arr.push(this.payload);
        if (this.right) singly? arr.push(this.right.toArray().toString().split(",")): arr.push(this.right.toArray());
        return singly? arr.toString().split(","): arr
    };

    return this;
}

/**
 * @description Node
 * @param {*} [pl=1] Payload
 * @param {Node} [nx] Next node
 * @param {Node} [pv] Previous node
 * @this Node
 * @return {Node} Node
 * @constructor
 * @since 1.0
 */
function Node (pl, nx, pv) {
    this.payload = pl || 1;
    this.next = nx; //Or new node()
    this.prev = pv;

    this.traverse = function () {
        if (this.next) this.next.traverse();
        Essence.say("payload: " + this.payload);
    };

    this.print = function () {
        if (this.next != null) this.next.print();
        Essence.print(this.payload + "=>");
    };

    this.printList = function () {
        if (this.next === null) Essence.txt2print += "->" + this.v;
        else this.next.printList();
        Essence.print("");
    };

    this.last = function () {
        if (this.next === null) return this;
        else return this.next.last()
    };

    this.append = function (n) {
        if (this.next === null) {
            this.next = new Node(n); //If there is no next node, link the new one here
            this.next.prev = this;
        }else this.next.append(n); //Else, append to next node
    };

    this.remove = function () {
        var n = this.next;
        this.next = n.next;
        n.next.prev = this;
    };

    this.reverse = function () {
        if (this.next == null) return this;
        else {
            var newHead = this.next.reverse();
            newHead.next = this;
            newHead.prev = null;
            this.prev = newHead;
            this.next = null;
            return newHead
        }
    };

    this.toString = function () {
        return "Node(payload = " + this.payload + ", previous = " + this.prev + ", next = " + this.next + ")"
    };

    this.equals = function (node) {
        return this.payload === node.payload && this.next.equals(node.next) && this.prev.equals(node.prev)
    };

    this.find = function (n, d) {
        if (!d) d = 0;
        if (this.payload === n) return d;
        if (this.next) return this.next.find(n, d + 1);
        return [-1, d]
    };
    return this;
}

/**
 * @description Path node
 * @param {number} g Total current cost
 * @param {number} h Total current heuristic
 * @returns {PathNode} Path node
 * @this PathNode
 * @constructor
 * @since 1.0
 */
function PathNode (g, h) { //Nodes for path finding algs
    this.f = g + h || 1;
    this.parent = null;
    return this;
}

NTreeNode.inheritsFrom(TreeNode);
/**
 * @description N-ary tree node
 * @see TreeNode
 * @param {*} pl Payload
 * @param {TreeNode[]} ch Childs
 * @returns {NTreeNode} NTreeNode
 * @this NTreeNode
 * @implements {TreeNode}
 * @constructor
 * @since 1.0
 */
function NTreeNode (pl, ch) {
    this.payload = pl || 0;
    this.childs = ch || [];
    this.add = function (c) {
        this.childs.push(c);
    };
    this.traverse = function () {
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) c.traverse();
        }
        return this
    };
    //Console printing
    this.printInOrder = function () {
        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].printInOrder();
            Essence.addToPrinter(this.payload + "->");
            this.childs[i + 1].printInOrder();
            Essence.addToPrinter("\r\n");
        }
    };
    this.printPreOrder = function () {
        for (var i = 0; i < this.childs - 1; i++) {
            Essence.addToPrinter(this.payload + "->");
            this.childs[i].printInOrder();
            this.childs[i + 1].printInOrder();
            Essence.addToPrinter("\r\n");
        }
    };
    this.printPostOrder = function () {
        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].printInOrder();
            this.childs[i + 1].printInOrder();
            Essence.addToPrinter(this.payload + "->");
            Essence.addToPrinter("\r\n");
        }
    };
    //Window printing
    this.inOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            println(t + sym + this.payload + s+" (deepth= " + d+")");
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            Essence.addToPrinter("\r\n");
        }
    };
    this.preOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        for (var i = 0; i < this.childs - 1; i++) {
            println(t + sym + this.payload + s+" (deepth= " + d+")");
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            Essence.addToPrinter("\r\n");
        }
    };
    this.postOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            println(t + sym + this.payload + s+" (deepth = " + d+")");
            Essence.addToPrinter("\r\n");
        }
    };
    //Getter
    this.getOrder = function (sym) {
        return this.childs.join(sym || "->");
    };

    this.isLeaf = function () { //Is it an end of branch ?
        return !isNon(this.childs)
    };

    this.find = function (n, method) {
        return (method.normal() === "bfs")? this.bfs(n): this.dfs(n)
    };
    this.dfs = function (n, d, td) { //Deepth First Search
        if (!d) d = 0; //Deepth
        if (!td) td = 0; //Total deepth
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) c.dfs(n, d + 1, td++);
        }
        return [-1, td]
    };
    this.bfs = function (n, b, tb) { //Breadth First Search
        if (!b) b = 0; //Breadth
        if (!tb) tb = 0; //Total breadth
        var queue = [];
        queue.unshift(this); //Add as the end
        while (queue != []) {
            b = 0;
            var cur = new TreeNode(queue.pop()); //Get the first element of the queue
            if (cur.payload === n) return [b, tb];
            if (cur.left) queue.unshift(cur.left);
            if (cur.right) queue.unshift(cur.right);
            b++;
            tb++;
        }
        return [-1, tb]
    };
    this.sum = function () {
        var s = this.payload;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) s += c.payload;
        }
        return s
    };
    this.min = function () {
        var m = this.payload;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) m = Math.min(m, c.payload);
        }
        return m
    };
    this.max = function () {
        var m = this.payload;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) m = Math.max(m, c.payload);
        }
        return m
    };
    this.nbOfBranches = function (n) {
        if (!n) n = 0;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) n = c.nbOfBranches(n + 1);
        }
        return n
    };
    this.avg = function () {
        return this.sum() / this.nbOfBranches()
    };
    this.printBFS = function (t) {
        var queue = [], tab = t || "-"; //Better and easier than a Queue/QueueList
        queue.unshift(this); //Add as the end
        while (queue != []) {
            var cur = new TreeNode(queue.pop()); //Get the first element of the queue
            println(tab + ">" + cur.payload);
            tab += "-";
            for (var c in this.childs) {
                if (this.childs.hasOwnProperty(c)) queue.unshift(c);
            }
        }
    };
    this.toString = function () {
        /* Essence.txt2print = "";
         this.printInOrder();
         return "Tree(" + Essence.txt2print + ")" */
        var str = "TreeNode(payload= " + this.payload + ", ";
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) str += c.toString();
        }
        return str.substring(0, str.length) + ")"
    };
    this.toArray = function (singly) {
        var arr = [];
        arr.push(this.payload);
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) singly? arr.push(c.toArray().toString().split(",")): arr.push(c.toArray());
        }
        return singly? arr.toString().split(","): arr
    };

    return this;
}

/**
 * @description Mathematical set.
 * It's depreciated in the next version (in favour of ES6) and will have the following methods instead:
 *   add(*), has(*), delete(*), size()->size, values(), clear()
 * @param {Array} [arr=[]] Array or element
 * @returns {Set} Set
 * @constructor
 * @this Set
 * @since 1.0
 */
function Set (arr) {
    this.value = (isType(arr, "Array")? arr: [arr]) || [];
    this.size = function () {
        return this.value.length
    };

    this.add = function (item) {
        if (isType(item, "array")) {
            for (var i = 0; i < item.length; i++) this.add(item[i]);
        }
        if (this.value.indexOf(item) === -1) this.value.push(item)
    };

    this.remove = function (item) {
        if (this.value.indexOf(item) !== -1) {
            if (isType(item, "array")) {
                for(var i = 0; i < item.length; i++) this.remove(item[i]);
            } else this.value = this.value.remove(item)
        }
    };

    this.clear = function (index) {
        index? this.value = this.value.remove(this.value[index]): this.value = []
    };

    this.isEmpty = function () {
        return this.value.length === 0
    };

    this.contains = function (item) {
        if (isType(item, "array")) {
            var c = true;
            for (var i = 0; i < item.length; i++) {
                if (!c) return false; //Reduce the cost of the operation by not doing any unnecessary work
                c = c && this.contains(item[i]);
            }
            return c
        } else return this.value.indexOf(item) != -1
    };

    this.equals = function (s) {
        return this.value.toString() === s.value.toString()
    };

    this.isSame = function (s) { //Check if both sets have the same elements but not necessarily in the same order
        if (this.equals(s)) return true;
        var same = true;
        for (var i = 0; i < s.size(); i++) {
            if (!same) return false;
            same = same && this.contains(s.value[i]);
        }
        return same
    };

    this.toString = function () {
        return "Set(" + this.value.toString() + ")"
    };

    this.subset = function (s, e) {
        return this.value.slice(s, e + 1)
    };

    this.get = function (i) {
        return this.value[i]
    };

    this.indexOf = function (val) {
        return this.value.indexOf(val);
    };

    this.set = function (i, val) {
        this.value[i] = val;
    };

    this.first = function () {
        return this.value[0]
    };

    this.last = function () {
        return this.value.last()
    };

    this.min = function (s, e) {
        return this.value.min(s, e)
    };

    this.max = function (s, e) {
        return this.value.max(s, e)
    };

    this.median = function (s, e) {
        return this.value.median(s, e)
    };

    return this;
}

SortedSet.inheritsFrom(Set);
/**
 * @description Sorted mathematical set
 * @this SortedSet
 * @see Set
 * @param {Array} arr Array
 * @returns {SortedSet} Sorted set
 * @constructor
 * @since 1.0
 */
function SortedSet (arr) {
    this.value = arr || [];
    this.add = function (item) {
        if (this.value.indexOf(item) === -1) {
            if (isType(item, "array")) this.value = this.value.concat(item);
            else this.value.push(item);
        }
        this.value.quickSort();
    };

    return this;
}

/**
 * @description Stack
 * @param {Array} [arr] Array
 * @param {number|null} [lim=null] Limit
 * @returns {Stack} Stack
 * @this Stack
 * @constructor
 * @since 1.0
 */
function Stack (arr, lim) {
    this.value = isType(lim, "Number")? new Array(lim): [];
    this.limit = lim || null;
    if (arr) this.value.push(arr);

    this.peek = function () { //Returns the top value
        return this.value.last()
    };

    this.ground = function () { //Returns the bottom value
        return this.value[0]
    };

    this.push = function (item) {
        if (this.isFull()) throw new Error("Stack overflow !");
        isType(item, "array")? this.value.append(item): this.value.push(item);
    };

    this.pop = function () {
        if (this.isEmpty()) throw new Error("Stack underflow !");
        var it = this.peek();
        this.value.pop(it);
        return it
    };

    this.isEmpty = function () {
        return this.value.length === 0
    };

    this.isFull = function () {
        return this.lim != null? this.value.length >= this.limit: false
    };

    this.size = function () {
        return this.value.length
    };

    this.toString = function () {
        return "Stack(" + this.value.toString() + ")"
    };

    this.equals = function (s) {
        return this.toString() === s.toString()
    };

    return this;
}

/**
 * @description Stack array
 * @param {number} sz Array size
 * @returns {StackArray} Stack array
 * @this StackArray
 * @constructor
 * @since 1.0
 */
function StackArray (sz) {
    this.value = new Array(sz);
    this.top = -1;

    this.peek = function () { //Returns the top value
        return this.value[this.top]
    };

    this.push = function (item) {
        if (this.isFull()) throw new Error("Stack overflow !");
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.push(item[i]);
        } else {
            this.top++;
            this.value[this.top] = item;
        }
    };

    this.pop = function (item) {
        if (this.isEmpty()) throw new Error("Stack underflow !");
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.pop(item[i]);
        } else {
            var el = this.peek();
            this.top--;
            return el
        }
    };

    this.isEmpty = function () {
        return this.top <= -1
    };

    this.isFull = function () {
        return this.top >= this.value.length
    };

    this.size = function () {
        return this.top + 1
    };

    this.toString = function () {
        return "Stack(" + this.value.toString() + ")"
    };

    this.equals = function (s) {
        return this.toString() === s.toString()
    };

    return this;
}

/**
 * @description Stack list
 * @param {Array|*} [arr] Array or element
 * @returns {StackList} Stack list
 * @this StackList
 * @constructor
 * @since 1.0
 */
function StackList (arr) {
    this.top = new Node();

    this.peek = function () { //Returns the top value
        return (this.isEmpty() || this.top == null)? null: this.top.next.payload
    };

    this.push = function (item) {
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.push(item[i]);
        } else {
            var n = new Node(item, this.top);
            this.top = n;
        }
        return this
    };
    if (arr) this.push(arr);

    this.pop = function (n) {
        if (!this.isEmpty()) throw new Error("I can't pop from an empty stack list");
        if (n) {
            for(var i = 0; i < n; i++) this.pop();
        } else {
            var el = this.top.payload;
            this.top = this.top.next;
            return el
        }
    };

    this.isEmpty = function () {
        return this.top == null
    };

    this.size = function (n) {
        return this.top != null? this.size(n + 1): n
    };

    return this;
}

/**
 * @description Queue
 * @param {Array|*} [arr] Array or element
 * @param {number|null} [lim=null] Limit
 * @returns {Queue} Queue
 * @this Queue
 * @constructor
 * @since 1.0
 */
function Queue (arr, lim) {
    this.value = isType(lim, "Number")? new Array(lim): [];
    this.limit = lim || null;
    if (arr) this.value.push(arr);

    this.enqueue = function (item) {
        if (this.isFull()) throw new Error("Queue overflow !");
        isType(item, "array")? this.value.preppend(item): this.value.unshift(item);
    };

    this.dequeue = function () {
        if (this.isEmpty()) throw new Error("Queue underflow !");
        var it = this.head();
        this.value.pop();
        return it
    };

    this.head = function () { //Returns the first value
        return this.value.last()
    };

    this.tail = function () { //Returns the last value
        return this.value[0]
    };

    this.isEmpty = function () {
        return this.value.length === 0
    };

    this.isFull = function () {
        return this.lim != null? this.value.length >= this.limit: false
    };

    this.size = function () {
        return this.value.length
    };

    this.toString = function () {
        return "Queue(head = " + this.head() + ", tail = " + this.tail() + ", value = " + this.value.toString() + ")"
    };

    this.equals = function (queue) {
        return this.toString() === queue.toString()
    };

    return this;
}

/**
 * @description Queue array
 * @param {Array|*} [arr=[]] Array or element
 * @returns {QueueArray} QueueArray
 * @this QueueArray
 * @constructor
 * @since 1.0
 */
function QueueArray (arr) {
    this.value = arr || [];
    this.front = -1;
    this.back = -1;

    this.enqueue = function (item) {
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.enqueue(item[i]);
        } else {
            if (this.isFull()) throw new Error("The queue is full");
            if (this.isEmpty()) {
                this.front++;
                this.back++;
                this.value[this.back] = item;
            } else {
                this.back = (this.back + 1) % this.value.length;
                this.value[this.back] = item;
            }
        }
    };

    this.dequeue = function () {
        var val;
        if (this.isEmpty()) throw new Error("I can't dequeue from an empty queue");
        if (this.front === this.back) {
            val = this.value[this.front];
            this.front = this.back = -1;
        }else {
            val = this.value[this.front];
            this.front = (this.front + 1) % this.value.length;
        }
        return val
    };

    this.isEmpty = function () {
        return this.front === -1 && this.back === -1
    };

    this.isFull = function () {
        return this.back>(this.front + 1) % this.value.length
    };

    this.size = function () {
        return this.value.length
    };

    this.toString = function () {
        return "Queue(front = " + this.front + ", back = " + this.back + ", value = " + this.value.toString() + ")"
    };

    this.equals = function (queue) {
        return this.toString() === queue.toString()
    };

    return this;
}

/**
 * @description Queue list
 * @this QueueList
 * @returns {QueueList} QueueList
 * @todo Probably add the pre-init similar to StackList() ?
 * @constructor
 * @since 1.0
 */
function QueueList () {
    this.front = null;
    this.back = null;
    this.len = 0;

    this.enqueue = function (item) {
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.enqueue(item[i]);
        } else {
            var n = this.back != null? new Node(item, this.back, null): new Node(item);
            if (this.back.prev != null) this.back.prev = n;
            this.back = n;
            this.len++;
        }
        return this
    };

    this.dequeue = function () {
        if (this.isEmpty()) throw new Error("I can't dequeue an empty queue list");
        this.front = this.front.prev;
        this.len--;
        return this.front
    };

    this.isEmpty = function () {
        return this.len === 0 || this.back === null
    };

    this.size = function () {
        return this.len
    };

    this.toString = function () {
        var str = "", crt = this.front;
        while (crt != null) {
            str += "<-"+ crt.payload;
            crt = crt.prev;
        }
        return str
    };

    this.equals = function (queue) {
        return this.toString() === queue.toString()
    };

    this.remove = function (pl) {
        var crt = this.front;
        while (crt != null) {
            if (crt.payload != null && (crt.payload == pl || crt.payload.equals(pl))) crt = null;
            crt = crt.next;
        }
    };

    this.insertAt = function (i, pl) {
        this.back.next = new Node(pl);
        if (i === 0) this.front = new Node(pl);
        else if (i === this.len) this.back = new Node(pl);
        else if (i > this.len) this.enqueue(pl);
    };

    return this;
}

/**
 * @description A* path finding algorithm
 * @todo Make sure it works properly
 * @param {PathNode} start Starting node
 * @param {PathNode} goal Ending node
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function Astar (start, goal) {
    //Inspired from http://Heyes-jones.com/pseudocode.php
    //PathNode.f (score) = g (sum of all cost to get at this point) + h (heuristic: estimate of what it will take to get the goal)
    var nodeGoal = goal, nodeCurrent, nodeSuccessor, _h;
    var openList = [start], closedList = [];
    while (openList.length > 0) {
        var scores = [], minScore = openList[0].f;
        for (var i in openList) {
            if (openList.hasOwnProperty(i)) {
                scores.push(openList[i].f);
                minScore = Math.min(minScore, openList[i].f);
            }
        }
        nodeCurrent = openList.filter(function (x) {
            if (x.f === minScore) return x
        })[0];
        openList = openList.filter(function (x) {
            if (x.f != minScore) return x
        });
        if (nodeCurrent === nodeGoal) {
            //Generate each states nodeSucessor that can come after nodeCurrent
            for (nodeSucessor in nodeCurrent) {
                if (nodeCurrent.hasOwnProperty(nodeSuccessor)) {
                    nodeSuccessor.f = nodeCurrent.f + h(nodeSuccessor, nodeCurrent);
                    var l = lookfor(nodeSuccessor, openList);
                    if (l != -1) {
                        l = l[0];
                        //If the current node is better then continue
                        if (nodeCurrent.f < openList[l] || (lookfor(nodeSuccessor, closedList) != -1 && nodeCurrent.f < openList[lookfor(nodeSuccessor, closedList)][0])) continue;
                        openList = openList.remove(nodeSuccessor);
                        closedList = closedList.remove(nodeSuccessor);
                        nodeSuccessor.parent = nodeCurrent;
                        _h = h(nodeSuccessor, nodeGoal);
                        openList.push(nodeSuccessor);
                    }
                    closedList.push(nodeCurrent);
                }
            }
            throw "Solution found ! With h=" + _h;
        }
    }
}

/**
 * @description A* algorithm v2
 * @param {number[]} start Starting node
 * @param {number[]} goal Ending node
 * @param {Array} grid Grid
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function A(start, goal, grid) { //JS version of https://en.wikipedia.org/wiki/A*_search_algorithm
    var closedSet = [], openSet = [start], cameFrom = [], gScore = [0], fScore = [euclidianDist(start, goal)];

    while (openSet.length > 0) {
        var current = openSet[fScore.indexOf(fScore.min())];
        if (current === goal) return reconPath(cameFrom, current, grid);
        openSet = openSet.remove(current);
        closedSet.push(current);
        var n = grid.neighbour(current[0], current[1]);
        Essence.say("neighbour of " + current + ":\n" + n.toStr(true), "info");
        for (var i = 0; i < n; i++) {
            if (closedSet.indexOf(n[i]) > -1) continue;
            var tentativeGScore = gScore[closedSet.indexOf(current)] + 1;
            if (closedSet.indexOf(n[i]) === -1) openSet.push(n[i]);
            else if (tentativeGScore >= gScore[i]) break;
        }

        cameFrom[i] = current;
        gScore[i] = tentativeGScore;
        fScore[i] = gScore[i] + euclidianDist(n[i], goal);
    }
}

/**
 * @description Path reconstructor
 * @param {Array} cameFrom List of visited nodes
 * @param {Array} current Current node
 * @param {Array} grid Grid
 * @returns {Array} Reconstructed path
 * @since 1.0
 * @func
 */
function reconPath(cameFrom, current, grid) {
    var totalPath = [current];
    while (current in keyList(cameFrom)) {
        current = cameFrom[grid.lookFor(current)];
        totalPath.append(current);
    }
    return totalPath;
}

/**
 * @description Iterative Depending A* path finding algorithm
 * @returns {undefined}
 * @since 1.0
 * @func
 * @see Astar
 * @todo Do it !
 */
function IDAstar () {

}

/**
 * @description Sort alphabetically an string|array
 * @param {string|Array} x String/array to alphabetically sort
 * @returns {string|Array} Sorted string|array
 * @since 1.0
 * @func
 */
function alphabetSort (x) {
    if (!x.isIterable()) throw new Error("alphabetSort cannot sort non iterable objects");
    if (isType(x, "String")) return x.split("").quickSort().join("");

    var res = x.uniform(), s = true, j = 1;
    while (s) {
        s = false;
        for (var k = 0; k < res.maxLength(); k++) {
            for (var i = 0; i < res.length - j; i++) {
                if (k == 0 && res[i].charAt(k) > res[i + 1].charAt(k)) { //Sort the by the first letter
                    swap(res, i, i + 1);
                    s = true;
                } else if (res[i].charAt(k - 1) === res[i + 1].charAt(k - 1) && res[i].charAt(k) > res[i + 1].charAt(k)) {
                    swap(res, i, i + 1);
                    s = true;
                }
            }
            j++;
        }
    }
    return res.trimAll("r")
}

/**
 * @description Sort the array/string from the most occurring item to the least occurring ones
 * @param {Array|string} arr Array/string to sort
 * @returns {Array} Sorted occurrence list
 * @todo Improve because it's not right all the time
 * @since 1.0
 * @func
 */
function occurrenceSort(arr) {
    var tmp = rmDuplicates(arr), res = [];
    var counts = tmp.map(function (x) {
        return arr.count(x);
    });
    console.log("tmp", tmp, "\ncounts", counts);
    while (tmp.length > 0) {
        console.log(" tmp", tmp, "\ncounts", counts);
        for (var i = 0; i < tmp.length; i++) {
            if (counts[i] === counts.max()) {
                res.push(tmp[i]);
                counts = counts.remove(counts[i]);
                tmp = tmp.remove(tmp[i]);
            }
        }
    }
    return res;
}

/**
 * @description 2nd occurrence sorting alg
 * @todo Work on it !
 * @param {Array} arr Array to sort
 * @returns {{}} Result
 * @func
 * @since 1.1
 */
function occSort (arr) {
    var counts = arr.map(function (x) {
        return arr.count(x);
    }), vals = rmDuplicates(arr);
    var lookup = Objectify(vals, counts);

    return lookup;
}

/**
 * @description Find if x is in the list
 * @param {Array} list List
 * @param {*} x Element/term to find
 * @returns {boolean} Found or not
 * @since 1.0
 * @func
 */
function binarySearch (list, x) {
    list.quickSort();
    var i = 2, term = list[Math.floor(list.length / i)];
    while (term != x && i > 0) {
        if (term === x) return true;
        else {
            i *= 2;
            term = term < x? list[Math.floor(list.length / i)]: list[3 * Math.floor(list.length / i)];
        }
    }
    return term === x
}

/**
 * @description Compressed data using Huffman's approach while differentiating uppercase from lowercase letters
 * @param {string} [name="Archive"] Name of the archive
 * @param {string} [data=""] Data to compress
 * @returns {Archive} Archive
 * @constructor
 * @this {Archive}
 * @since 1.0
 */
function Archive (name, data) { //Compressed data using Huffman's approach while differentiating uppercase and lowercase letters
    this.name = name || "Archive";
    this.data = data || ""; //Data to compress
    this.dictionnary = []; //Values should be in the format: letter = bitcode
    this.result = [];
    this.updateDict = function () {
        var lexiq = [], count, tmp = alphabetSort(data);
        for (var i = 0; i < this.data.length - 1; i++) { //Fill lexiq
            if (tmp[i] != tmp[i+ 1]) lexiq.push(tmp[i]);
        }
        lexiq = rmDuplicates(lexiq);
        //lexiq.debug();
        //console.log(lexiq.getOccurrences());
        count = new Array(lexiq.length);
        tmp = [];
        for (i = 0; i < lexiq.length; i++) {
            count[i] = data.count(lexiq[i]);
            //Essence.say("lexiq[" + i + "]=" + lexiq[i] + " is present " + timesLiteral(count[i]), "inf");
            tmp[i] = lexiq[i] + count[i];
        }
        //Essence.say("Lexiq of " + this.name + ": " + lexiq + "\ncounts: " + count);

        this.dictionnary = occurrenceSort(this.data);

        for (i = 0; i < this.dictionnary.length; i++) this.result[i] = conv(i, 10, 2);
    };

    this.getResult = function () {
        this.updateDict();
        var res = this.data;
        for (var i = 0; i < this.data.length; i++) {
            console.log(i + "// " + this.dictionnary[this.dictionnary.indexOf(this.data[i])]);
            res = res.replace(RegExpify(this.dictionnary[this.dictionnary.indexOf(this.data[i])]), this.result[i]);
        }

        return res;
    };
    return this
}

/**
 * @description State history allowing undos and redos on the element while keeping track of the previous and following states
 * @param {*} elm Element
 * @this {virtualHistory}
 * @constructor
 * @returns {virtualHistory} Virtual history
 * @since 1.0
 */
function virtualHistory (elm) {
    this.src = elm;
    this.DEFAULT_STATE = elm;
    this.states = new Set(this.src);
    this.state = 0;

    this.reset = function () { //Go back to the default state
        this.src = this.DEFAULT_STATE;
    };

    this.update = function (elm) { //Update the current state if needed
        if (this.src != elm) this.add(elm);
    };

    this.add = function (val) { //Add a state
        if (isType(val, "array")) {
            for (var i = 0; i < val.length; i++) this.add(val[i]);
        } else {
            this.src = val;
            this.states.add(this.src);
            this.state++;
        }
    };

    this.get = function (i) {
        return this.states.get(i)
    };

    this.undo = function () {
        if (this.state === 0) throw new Error("Set underflow, it's not possible to undo to a non-existent state.");
        this.state--;
        this.src = this.get(this.state);
    };

    this.redo = function () {
        if (this.state === (this.states.size() - 1)) throw new Error("Set overflow, it's not possible to redo to a non-existent state.");
        this.state++;
        this.src = this.get(this.state);
    };

    this.getStates = function () {
        return this.states.toString()
    };

    this.isStateDefault = function () { //Check if the current state is the default
        return this.src === this.DEFAULT_STATE
    };

    return this;
}

/**
 * @description Get the occurence list
 * @param {string} list String
 * @returns {{}} Occurent object list
 * @since 1.0
 */
function occurrenceList (list) {
    if (!list.isIterable()) throw new Error("It must be an iterable object !");
    var nums = list.getOccurrences(true), chars = [], oc = list.getOccurrences(), res = {};
    for (var i = 0; i < oc.length; i++) chars[i] = oc[i].split(":")[0];
    for (i = 0; i < nums.length; i++) res[chars[i]] = nums[i];
    return res;
}

/**
 * @description Stream
 * @param {number} [initVal=0] Initial value
 * @param {string} [formula="x + 1"] Formula
 * @param {number} [nbVals] Number of values
 * @this {Stream}
 * @returns {Stream} Stream
 * @constructor
 * @since 1.0
 */
function Stream (initVal, formula, nbVals) {
    this.start = initVal || 0;
    this.formula = formula || "x + 1";
    this.data = [this.start];

    this.next = function () { //use PEG.js to solve the issue ?
        this.data.push(eval(this.formula.multiReplace([
            [/x/g, this.data.last()], [/x0/g, this.start],
            [/pi/ig, Math.PI], [/e/ig, Math.E], [/sqrt(2)/ig, Math.SQRT2],
            [/(pow|max|min)\((.*?),(| )(.*?)\)/, "Math.$1($2, $3)"],
            [/(sqrt|cbrt|cos|sin|tan|acos|asin|cosh|sinh|tanh|acosh|asinh|atanh|exp|abs)\((.*?)\)/, "Math.$1($2)"],
            [/(ln|log|nthroot|clampTop|clampBottom)\((.*?),(| )(.*?)\)/, "$1($2, $3)"],
            [/(clamp)\((.*?),(| )(.*?),(| )(.*?)\)/, "$1($2, $3, $)"],
        ])));
    };

    if (nbVals) {
        for (var i = 1; i < nbVals; i++) this.next();
    }

    this.toString = function () {
        return "Stream(start=" + this.start + ", formula=" + this.formula + ", data=" + this.data.toStr(true) + ")";
    };

    return this;
}

/**
 * @description Stream with multiple variables
 * @param {number} [initVal=0] Initial value
 * @param {string} [formula="x + y"] Formula
 * @param {number} [nbVals] Number of values
 * @returns {MultiStream} Multi-variable stream
 * @this {MultiStream}
 * @constructor
 * @since 1.0
 */
function MultiStream (initVal, formula, nbVals) { //Stream with multiple variables
    this.start = initVal || 0;
    this.formula = formula || "x + y";
    this.data = [this.start];
    this.results = [];

    this.next = function () { //use PEG.js to solve the issue ?
        this.data.push(this.data.last().map(function (x) {
            return x + 1;
        }));
        this.results.push(this.compute(this.data.last()));
    };

    this.compute = function (data) { //Turn an expression into a number
        return eval(this.formula.multiReplace([
            [/x/g, data[0]], [/x0/g, this.start[0]],
            [/y/g, data[1]], [/y0/g, this.start[1]],
            [/z/g, data[2]], [/z0/g, this.start[2]],
            [/pi/ig, Math.PI], [/e/ig, Math.E], [/sqrt(2)/ig, Math.SQRT2],
            [/(pow|max|min)\((.*?),(| )(.*?)\)/, "Math.$1($2, $3)"], //fails on first occurrence
            [/(sqrt|cbrt|cos|sin|tan|acos|asin|cosh|sinh|tanh|acosh|asinh|atanh|exp|abs|e\^)\((.*?)\)/, "Math.$1($2)"],
            [/(ln|log|nthroot|clampTop|clampBottom)\((.*?),(| )(.*?)\)/, "$1($2, $3)"],
            [/(clamp)\((.*?),(| )(.*?),(| )(.*?)\)/, "$1($2, $3, $4)"]
        ]))
    };

    this.results = [this.compute(this.start)];

    if (nbVals > 1) {
        for (var i = 1; i < nbVals; i++) this.next();
    }

    this.toString = function () {
        return "Stream(start=" + this.start.toStr(true) + ", formula=" + this.formula + ", data=" + this.data.toStr(true) + ", results=" + this.results.toStr(true) + ")";
    };

    return this;
}

/**
 * @description Numerical graph
 * @param {string} formula Formula
 * @param {number[]} [dims=[50, 50]] Dimensions
 * @param {string[]} [lbls=["x", "y"]] Axis labels
 * @param {string} [name="Graph"] Name
 * @param {number} precision Precision
 * @returns {Graph} Numerical graph
 * @this {Graph}
 * @constructor
 * @since 1.0
 */
function Graph (formula, dims, lbls, name, precision) { //N-dimensional graph
    this.labels = lbls || ["x", "y"];
    this.name = name || "Graph";
    this.dimension = dims || new Array(this.labels.length).fill(50);
    this.equation = new Equation(formula); //y=...
    // this.stream = new Stream(0, this.formula.split("=")[1], this.dimension[0]);
    this.data = precision? range(0, precision, this.dimension[0], (Number(precision)).length()[1]): range(this.dimension[0]);
    for (var i = 0; i < this.data.length; i++) this.data[i] = [this.data[i], this.equation.compute({x: this.data[i]})];

    this.toString = function () {
        return "Graph(name=" + this.name + ", labels=" + this.labels.toStr(true) + ", dimension=" + this.dimension + ", this.formula=" + this.formula + ", data=" + this.data + ")";
    };

    return this;
}

/**
 * @description Permutation
 * @param {string|Array} data Data
 * @todo Make it work well
 * @returns {string|Array} Permuation list
 * @since 1.0
 */
function Permutation(data) {
    console.log("data=" + data);
    console.log("->" + data.get(-1));
    var perm = [data];
    perm.append((data.length > 1)? Permutation(data.get(-1)): data);
    console.log("perm=" + perm);
    return perm;
}

/**
 * @description Event-trace table
 * @param {string} [name="Event table"] Name
 * @param {string[]} [srcs=[getFilename(true)]] Sources
 * @returns {EventTable} Event table
 * @constructor
 * @this {EventTable}
 * @since 1.0
 */
function EventTable(name, srcs) {
    this.name = name ||"Event table";
    this.sources = srcs || [getFilename(true)];
    this.table = [["Source", "Event", "Timestamp"]];
    this.add = function (evt) {
        this.table.push([evt.source || getFilename(true), evt.event, evt.timestamp || (new Date()).getTime()]);
        this.sources.uniquePush(evt.source || getFilename(true));
    };

    this.make = function (nb, space) {
        var ts = (new Date()).getTime();
        if(!space) space = 1;
        for (var i = 0; i < (nb || 1e3); i += space) {
            this.add({
                timestamp: ts + i
            });
        }
    };

    this.fill = function (src, desc) {
        var ts = (new Date()).getTime();
        var pos = lookfor(ts, this.table);
        if (pos === -1 && ts > this.table.last()[2]) this.add({source: src, event: desc, timestamp: ts});
        else {
            this.table[pos[0]][0] = src;
            this.table[pos[0]][1] = desc;
        }
    };

    this.getCleanTable = function () {
        var table = [];
        for (var i = 0; i < this.table.length; i++) {
            if (!isNon(this.table[i][1])) table.push(this.table[i]);
        }

        return table;
    };

    this.lookAt = function (ts) {
        var pos = lookfor(ts || (new Date()).getTime(), this.table)[0];
        return "'" + this.table[pos][1] + "' at " + this.table[pos][0];
    };

    return this;
}

//will be depreciated by Map in ES6
/**
 * @description Map (Hashless Hashmap).
 * It's depreciated in the next version (in favour of ES6) and will have the following methods instead:
 *
 * @param {*} [keys=[]] Keys
 * @constructor
 * @this {Map}
 * @returns {Map} Map
 * @since 1.1
 */
function Map (keys) {
    this.keys = new Set(keys || []);
    this.values = //Objectify(this.keys.value, new Array(this.keys.size()).fill([]));
    this.add = function (key, value) {
        Essence.say("Adding key/value: " + key + " / " + value);
        if (isType(key, "Array") && isType(value, "Array")) {
            for (var i = 0; i < key; i++) this.add(key[i], value[i]);
            Essence.say("Multi")
        } else if (isType(key, "Array")) {
            for (i = 0; i < key; i++) this.add(key[i], value);
            Essence.say("Multi key");
        }
        this.keys.add(key);
        if (this.values[key] === undefined) this.values[key] = [];
        this.values[key].push(value || null);
    };
    this.clear = function (key) {
        key? this.values[key] = []: this.keys = new Set();
    };
    this.has = function (val) {
        for (var k in this.keys) {
            if (this.keys.hasOwnProperty(k) && this.keys[k].indexOf(val) > -1) return true;
        }
        return false;
    };
    this.hasKey = function (key) {
        return this.keys.contains(key);
    };
    this.size = function () {
        var el = this.values;
      return this.keys.value.map(function (k) {
          return el[k].length;
      });
    };
    this.elements = function (spaced) {
        var el = this.values;
        return this.keys.value.map(function (k) {
            return spaced? el[k].toStr(true): el[k].toString();
        }).toStr(true);
    };
    this.isEmpty = function () {
        return this.keys.isEmpty(); //No need to check the values
    };
    this.get = function (key) {
        return this.values[key];
    };
    this.remove = function (key, value) {
        value? this.values[key] = this.values[key].remove(value): this.keys.remove(key);
    };
    this.toString = function () {
        return "Map(key/values=" + this.values.toArray().toStr(true) + ")";
    };
    this.forEach = function (act) {
        for (var i = 0; i < this.keys.size(); i++) act(this.keys.get(i));
    };
    this.merge = function (table) {
        this.keys.add(table.keys.value, table.values);
    };
    this.set = function (key, value) {
        this.keys.set(this.keys.indexOf(key), value);
    };
    this.replace = function (key, oldVal, newVal) {
        if (this.values[key].indexOf(oldVal) > -1) this.values[key] = this.values[key].replace(oldVal, newVal);
    };
    this.replaceAll = function (oldVal, newVal) {
        var self = this;
        this.forEach(function (k) {
            self.replace(k, oldVal, newVal);
        });
    };
    return this;
=======
/**
 * @module DataStruct
 * @description Data structures
 * @version 1.0
 * @since 1.1
 * @license MIT
 * @author Maximilian Berkmann <maxieberkmann@gmail.com>
 * @copyright Maximilian Berkmann 2016
 * @requires ../essence
 * @requires DOM
 * @requires Maths
 * @requires Files
 * @namespace
 * @type {{name: string, version: number, run: DataStruct.run, description: string, dependency: Array, author: string, complete: boolean}}
 * @since 1.1
 * @exports DataStruct
 */
var DataStruct = {
    name: "DataStruct",
    version: 1,
    run: function () {

    },
    description: "Data structures",
    dependency: ["DOM", "Maths", "Files"],
    author: "Maximilian Berkmann",
    complete: false,
    toString: function () {
        return "Module(name='" + this.name + "', version=" + this.version + ", description='" + this.description + "', author='" + this.author + "', complete=" + this.complete + ", run=" + this.run + ")";
    }
};

(function () {
    DataStruct.complete = true;
})();

/* eslint no-undef: 0 */

/**
 * @description Linked list
 * @param {*} [pl=1] Payload
 * @param {LinkedList} [nx={payload: 1, next: null}] Next
 * @param {string} name Name of the linked list
 * @returns {LinkedList} Linked list
 * @this LinkedList
 * @constructor
 * @since 1.0
 */
function LinkedList (pl, nx, name) {
    this.payload = pl || 1;
    this.next = nx || {payload: 1, next: null};
    this.next.show = function () {
        return this.name + ":" + this.next.payload + "->"
    };
    this.name = name;
    this.show = function () {
        return this.name + ":" + this.payload + "->" + this.next.show()
    };

    this.toString = function () {
        return "LinkedList(" + this.show() + ")"
    };
    return this
}

/**
 * @description Binary tree node
 * @param {*} [pl=0] Payload
 * @param {TreeNode} [l] Left child
 * @param {TreeNode} [r] Right child
 * @this TreeNode
 * @returns {TreeNode} Tree node
 * @interface
 * @constructor
 * @since 1.0
 */
function TreeNode (pl, l, r) { //Binary tree
    this.left = l;
    this.right = r;
    this.payload = pl || 0;

    this.add = function (l, r) {
        this.left = l;
        this.right = r;
    };
    this.addLeft = function (childs) {
        for (var i = 0; i < childs.length; i++) {
            if (i === 0) this.left = childs[0];
            else childs[i - 1].left = childs[i];
        }
    };
    this.addRight = function (childs) {
        for (var i in childs) {
            if(childs.hasOwnProperty(i)) {
                if (i === 0) this.right = childs[0];
                else childs[i-1].right = childs[i];
            }
        }
    };
    this.traverse = function () {
        if (this.left) this.left.traverse();
        if (this.right) this.right.traverse();
        return this
    };
    //Console printing
    this.printInOrder = function () {
        if (this.left) this.left.printInOrder();
        Essence.addToPrinter(this.payload + "->");
        if (this.right) this.right.printInOrder();
        Essence.addToPrinter("\r\n");
    };
    this.printPreOrder = function () {
        Essence.addToPrinter(this.payload + "->");
        if (this.left) this.left.printPreOrder();
        if (this.right) this.right.printPreOrder();
        Essence.addToPrinter("\r\n")
    };
    this.printPostOrder = function () {
        if (this.left) this.left.printPreOrder();
        if (this.right) this.right.printPreOrder();
        Essence.addToPrinter(this.payload + "->");
        Essence.addToPrinter("\r\n")
    };
    //Window printing
    this.inOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        if (this.left) this.left.inOrder(t + s, s, d + 1, sym);
        println(t + sym + this.payload + s+" (deepth = " + d+")");
        if (this.right) this.right.inOrder(t + s, s, d + 1, sym);
    };
    this.preOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        println(t + sym + this.payload + s+" (deepth = " + d+")");
        if (this.left) this.left.preOrder(t + s, s, d + 1, sym);
        if (this.right) this.right.preOrder(t + s, s, d + 1, sym)
    };
    this.postOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        if (this.left) this.left.postOrder(t + s, s, d + 1, sym);
        if (this.right) this.right.postOrder(t + s, s, d + 1, sym);
        println(t + sym + this.payload + s+" (deepth = " + d+")")
    };

    //Getter
    this.getInOrder = function (sym) {
        if (!sym) sym = "->";
        var order = "";

        if (this.left) order += this.left.getInOrder(sym);
        order += sym + this.payload;
        if (this.right) order += this.right.getInOrder(sym);
        return order
    };
    this.getPreOrder = function (sym) {
        if (!sym) sym = "->";
        var order = "";

        order += sym + this.payload;
        if (this.left) order += this.left.getPreOrder(sym);
        if (this.right) order += this.right.getPreOrder(sym);
        return order
    };
    this.getPostOrder = function (sym) {
        if (!sym) sym = "->";
        var order = "";

        if (this.left) order += this.left.getPostOrder(sym);
        if (this.right) order += this.right.getPostOrder(sym);
        return order + sym + this.payload
    };
    this.isLeaf = function () { //Is it an end of branch ?
        return !this.left && !this.right
    };
    this.find = function (n, method) {
        return (method.normal() === "bfs")? this.bfs(n): this.dfs(n)
    };
    this.dfs = function (n, d, td) { //Depth First Search
        if (!d) d = 0; //Depth
        if (!td) td = 0; //Total depth
        var stack = [];
        stack.push(this);
        while (stack != []) {
            d = 0;
            var cur = stack.pop();
            try {
                if (cur.payload === n) return [d, td]
            } catch (e) {
                return [-1, td]
            }
            if (cur.left) stack.push(cur.left);
            if (cur.right) stack.push(cur.right);
            d++;
            td++;
        }
    };
    this.bfs = function (n, b, tb) { //Breadth First Search
        if (!b) b = 0; //Breadth
        if (!tb) tb = 0; //Total breadth
        var queue = [];
        queue.unshift(this); //Add as the end
        while (queue != []) {
            b = 0;
            var cur = queue.pop(); //Get the first element of the queue
            try {
                if (cur.payload === n) return [b, tb]
            } catch(e) {
                return [-1, tb]
            }
            if (cur.left) queue.unshift(cur.left);
            if (cur.right) queue.unshift(cur.right);
            b++;
            tb++;
        }
    };
    this.sum = function () {
        var s = this.payload;
        if (this.left) s += this.left.sum();
        if (this.right) s += this.right.sum();
        return s
    };
    this.min = function () {
        var m = this.payload;
        if (this.left) m = Math.min(m, this.left.min());
        if (this.right) m = Math.min(m, this.right.min());
        return m
    };
    this.max = function () {
        var m = this.payload;
        if (this.left) m = Math.max(m, this.left.max());
        if (this.right) m = Math.max(m, this.right.max());
        return m
    };
    this.nbOfBranches = function (n) {
        if (!n) n = 0;
        if (this.left) n = this.left.nbOfBranches(n + 1);
        if (this.right) n = this.right.nbOfBranches(n + 1);
        return n
    };
    this.avg = function () {
        return this.sum()/this.nbOfBranches()
    };
    this.printBFS = function (sym) {
        if (!sym) sym = "->";
        var queue = [], res = "";
        queue.unshift(this); //Add as the end
        while (queue!=[]) {
            var cur = queue.pop(); //Get the first element of the queue
            res += cur + sym;
            try {
                if (cur.left) queue.unshift(cur.left);
                if (cur.right) queue.unshift(cur.right);
            } catch(e) {
                Essence.say(e + " caused " + this + ".printBFS(" + sym + ") to go wrong", "err");
            }
        }
        return sym
    };
    this.toString = function () {
        /* Essence.txt2print = "";
         this.printInOrder();
         return "Tree(" + Essence.txt2print + ")" */
        var str = "TreeNode(payload = " + this.payload + ", ";
        if (this.left) str += "left = " + this.left.toString();
        if (this.right) str += "right = " + this.right.toString();
        return str.substring(0, str.length) + ")"
    };
    this.toArray = function (singly) {
        var arr = [];
        if (this.left) singly? arr.push(this.left.toArray().toString().split(",")): arr.push(this.left.toArray());
        arr.push(this.payload);
        if (this.right) singly? arr.push(this.right.toArray().toString().split(",")): arr.push(this.right.toArray());
        return singly? arr.toString().split(","): arr
    };

    return this;
}

/**
 * @description Node
 * @param {*} [pl=1] Payload
 * @param {Node} [nx] Next node
 * @param {Node} [pv] Previous node
 * @this Node
 * @return {Node} Node
 * @constructor
 * @since 1.0
 */
function Node (pl, nx, pv) {
    this.payload = pl || 1;
    this.next = nx; //Or new node()
    this.prev = pv;

    this.traverse = function () {
        if (this.next) this.next.traverse();
        Essence.say("payload: " + this.payload);
    };

    this.print = function () {
        if (this.next != null) this.next.print();
        Essence.print(this.payload + "=>");
    };

    this.printList = function () {
        if (this.next === null) Essence.txt2print += "->" + this.v;
        else this.next.printList();
        Essence.print("");
    };

    this.last = function () {
        if (this.next === null) return this;
        else return this.next.last()
    };

    this.append = function (n) {
        if (this.next === null) {
            this.next = new Node(n); //If there is no next node, link the new one here
            this.next.prev = this;
        }else this.next.append(n); //Else, append to next node
    };

    this.remove = function () {
        var n = this.next;
        this.next = n.next;
        n.next.prev = this;
    };

    this.reverse = function () {
        if (this.next == null) return this;
        else {
            var newHead = this.next.reverse();
            newHead.next = this;
            newHead.prev = null;
            this.prev = newHead;
            this.next = null;
            return newHead
        }
    };

    this.toString = function () {
        return "Node(payload = " + this.payload + ", previous = " + this.prev + ", next = " + this.next + ")"
    };

    this.equals = function (node) {
        return this.payload === node.payload && this.next.equals(node.next) && this.prev.equals(node.prev)
    };

    this.find = function (n, d) {
        if (!d) d = 0;
        if (this.payload === n) return d;
        if (this.next) return this.next.find(n, d + 1);
        return [-1, d]
    };
    return this;
}

/**
 * @description Path node
 * @param {number} g Total current cost
 * @param {number} h Total current heuristic
 * @returns {PathNode} Path node
 * @this PathNode
 * @constructor
 * @since 1.0
 */
function PathNode (g, h) { //Nodes for path finding algs
    this.f = g + h || 1;
    this.parent = null;
    return this;
}

NTreeNode.inheritsFrom(TreeNode);
/**
 * @description N-ary tree node
 * @see TreeNode
 * @param {*} pl Payload
 * @param {TreeNode[]} ch Childs
 * @returns {NTreeNode} NTreeNode
 * @this NTreeNode
 * @implements {TreeNode}
 * @constructor
 * @since 1.0
 */
function NTreeNode (pl, ch) {
    this.payload = pl || 0;
    this.childs = ch || [];
    this.add = function (c) {
        this.childs.push(c);
    };
    this.traverse = function () {
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) c.traverse();
        }
        return this
    };
    //Console printing
    this.printInOrder = function () {
        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].printInOrder();
            Essence.addToPrinter(this.payload + "->");
            this.childs[i + 1].printInOrder();
            Essence.addToPrinter("\r\n");
        }
    };
    this.printPreOrder = function () {
        for (var i = 0; i < this.childs - 1; i++) {
            Essence.addToPrinter(this.payload + "->");
            this.childs[i].printInOrder();
            this.childs[i + 1].printInOrder();
            Essence.addToPrinter("\r\n");
        }
    };
    this.printPostOrder = function () {
        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].printInOrder();
            this.childs[i + 1].printInOrder();
            Essence.addToPrinter(this.payload + "->");
            Essence.addToPrinter("\r\n");
        }
    };
    //Window printing
    this.inOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            println(t + sym + this.payload + s+" (deepth= " + d+")");
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            Essence.addToPrinter("\r\n");
        }
    };
    this.preOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        for (var i = 0; i < this.childs - 1; i++) {
            println(t + sym + this.payload + s+" (deepth= " + d+")");
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            Essence.addToPrinter("\r\n");
        }
    };
    this.postOrder = function (t, s, d, sym) {
        if (!t) t = "";
        if (!s) s = "&nbsp;&nbsp;";
        if (!d) d = 0;
        if (!sym) sym = "|-";

        for (var i = 0; i < this.childs - 1; i++) {
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            this.childs[i].inOrder(t + s, s, d + 1, sym);
            println(t + sym + this.payload + s+" (deepth = " + d+")");
            Essence.addToPrinter("\r\n");
        }
    };
    //Getter
    this.getOrder = function (sym) {
        return this.childs.join(sym || "->");
    };

    this.isLeaf = function () { //Is it an end of branch ?
        return !isNon(this.childs)
    };

    this.find = function (n, method) {
        return (method.normal() === "bfs")? this.bfs(n): this.dfs(n)
    };
    this.dfs = function (n, d, td) { //Deepth First Search
        if (!d) d = 0; //Deepth
        if (!td) td = 0; //Total deepth
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) c.dfs(n, d + 1, td++);
        }
        return [-1, td]
    };
    this.bfs = function (n, b, tb) { //Breadth First Search
        if (!b) b = 0; //Breadth
        if (!tb) tb = 0; //Total breadth
        var queue = [];
        queue.unshift(this); //Add as the end
        while (queue != []) {
            b = 0;
            var cur = new TreeNode(queue.pop()); //Get the first element of the queue
            if (cur.payload === n) return [b, tb];
            if (cur.left) queue.unshift(cur.left);
            if (cur.right) queue.unshift(cur.right);
            b++;
            tb++;
        }
        return [-1, tb]
    };
    this.sum = function () {
        var s = this.payload;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) s += c.payload;
        }
        return s
    };
    this.min = function () {
        var m = this.payload;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) m = Math.min(m, c.payload);
        }
        return m
    };
    this.max = function () {
        var m = this.payload;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) m = Math.max(m, c.payload);
        }
        return m
    };
    this.nbOfBranches = function (n) {
        if (!n) n = 0;
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) n = c.nbOfBranches(n + 1);
        }
        return n
    };
    this.avg = function () {
        return this.sum() / this.nbOfBranches()
    };
    this.printBFS = function (t) {
        var queue = [], tab = t || "-"; //Better and easier than a Queue/QueueList
        queue.unshift(this); //Add as the end
        while (queue != []) {
            var cur = new TreeNode(queue.pop()); //Get the first element of the queue
            println(tab + ">" + cur.payload);
            tab += "-";
            for (var c in this.childs) {
                if (this.childs.hasOwnProperty(c)) queue.unshift(c);
            }
        }
    };
    this.toString = function () {
        /* Essence.txt2print = "";
         this.printInOrder();
         return "Tree(" + Essence.txt2print + ")" */
        var str = "TreeNode(payload= " + this.payload + ", ";
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) str += c.toString();
        }
        return str.substring(0, str.length) + ")"
    };
    this.toArray = function (singly) {
        var arr = [];
        arr.push(this.payload);
        for (var c in this.childs) {
            if (this.childs.hasOwnProperty(c)) singly? arr.push(c.toArray().toString().split(",")): arr.push(c.toArray());
        }
        return singly? arr.toString().split(","): arr
    };

    return this;
}

/**
 * @description Mathematical set.
 * It's depreciated in the next version (in favour of ES6) and will have the following methods instead:
 *   add(*), has(*), delete(*), size()->size, values(), clear()
 * @param {Array} [arr=[]] Array or element
 * @returns {Set} Set
 * @constructor
 * @this Set
 * @since 1.0
 */
function Set (arr) {
    this.value = (isType(arr, "Array")? arr: [arr]) || [];
    this.size = function () {
        return this.value.length
    };

    this.add = function (item) {
        if (isType(item, "array")) {
            for (var i = 0; i < item.length; i++) this.add(item[i]);
        }
        if (this.value.indexOf(item) === -1) this.value.push(item)
    };

    this.remove = function (item) {
        if (this.value.indexOf(item) !== -1) {
            if (isType(item, "array")) {
                for(var i = 0; i < item.length; i++) this.remove(item[i]);
            } else this.value = this.value.remove(item)
        }
    };

    this.clear = function (index) {
        index? this.value = this.value.remove(this.value[index]): this.value = []
    };

    this.isEmpty = function () {
        return this.value.length === 0
    };

    this.contains = function (item) {
        if (isType(item, "array")) {
            var c = true;
            for (var i = 0; i < item.length; i++) {
                if (!c) return false; //Reduce the cost of the operation by not doing any unnecessary work
                c = c && this.contains(item[i]);
            }
            return c
        } else return this.value.indexOf(item) != -1
    };

    this.equals = function (s) {
        return this.value.toString() === s.value.toString()
    };

    this.isSame = function (s) { //Check if both sets have the same elements but not necessarily in the same order
        if (this.equals(s)) return true;
        var same = true;
        for (var i = 0; i < s.size(); i++) {
            if (!same) return false;
            same = same && this.contains(s.value[i]);
        }
        return same
    };

    this.toString = function () {
        return "Set(" + this.value.toString() + ")"
    };

    this.subset = function (s, e) {
        return this.value.slice(s, e + 1)
    };

    this.get = function (i) {
        return this.value[i]
    };

    this.indexOf = function (val) {
        return this.value.indexOf(val);
    };

    this.set = function (i, val) {
        this.value[i] = val;
    };

    this.first = function () {
        return this.value[0]
    };

    this.last = function () {
        return this.value.last()
    };

    this.min = function (s, e) {
        return this.value.min(s, e)
    };

    this.max = function (s, e) {
        return this.value.max(s, e)
    };

    this.median = function (s, e) {
        return this.value.median(s, e)
    };

    return this;
}

SortedSet.inheritsFrom(Set);
/**
 * @description Sorted mathematical set
 * @this SortedSet
 * @see Set
 * @param {Array} arr Array
 * @returns {SortedSet} Sorted set
 * @constructor
 * @since 1.0
 */
function SortedSet (arr) {
    this.value = arr || [];
    this.add = function (item) {
        if (this.value.indexOf(item) === -1) {
            if (isType(item, "array")) this.value = this.value.concat(item);
            else this.value.push(item);
        }
        this.value.quickSort();
    };

    return this;
}

/**
 * @description Stack
 * @param {Array} [arr] Array
 * @param {number|null} [lim=null] Limit
 * @returns {Stack} Stack
 * @this Stack
 * @constructor
 * @since 1.0
 */
function Stack (arr, lim) {
    this.value = isType(lim, "Number")? new Array(lim): [];
    this.limit = lim || null;
    if (arr) this.value.push(arr);

    this.peek = function () { //Returns the top value
        return this.value.last()
    };

    this.ground = function () { //Returns the bottom value
        return this.value[0]
    };

    this.push = function (item) {
        if (this.isFull()) throw new Error("Stack overflow !");
        isType(item, "array")? this.value.append(item): this.value.push(item);
    };

    this.pop = function () {
        if (this.isEmpty()) throw new Error("Stack underflow !");
        var it = this.peek();
        this.value.pop(it);
        return it
    };

    this.isEmpty = function () {
        return this.value.length === 0
    };

    this.isFull = function () {
        return this.lim != null? this.value.length >= this.limit: false
    };

    this.size = function () {
        return this.value.length
    };

    this.toString = function () {
        return "Stack(" + this.value.toString() + ")"
    };

    this.equals = function (s) {
        return this.toString() === s.toString()
    };

    return this;
}

/**
 * @description Stack array
 * @param {number} sz Array size
 * @returns {StackArray} Stack array
 * @this StackArray
 * @constructor
 * @since 1.0
 */
function StackArray (sz) {
    this.value = new Array(sz);
    this.top = -1;

    this.peek = function () { //Returns the top value
        return this.value[this.top]
    };

    this.push = function (item) {
        if (this.isFull()) throw new Error("Stack overflow !");
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.push(item[i]);
        } else {
            this.top++;
            this.value[this.top] = item;
        }
    };

    this.pop = function (item) {
        if (this.isEmpty()) throw new Error("Stack underflow !");
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.pop(item[i]);
        } else {
            var el = this.peek();
            this.top--;
            return el
        }
    };

    this.isEmpty = function () {
        return this.top <= -1
    };

    this.isFull = function () {
        return this.top >= this.value.length
    };

    this.size = function () {
        return this.top + 1
    };

    this.toString = function () {
        return "Stack(" + this.value.toString() + ")"
    };

    this.equals = function (s) {
        return this.toString() === s.toString()
    };

    return this;
}

/**
 * @description Stack list
 * @param {Array|*} [arr] Array or element
 * @returns {StackList} Stack list
 * @this StackList
 * @constructor
 * @since 1.0
 */
function StackList (arr) {
    this.top = new Node();

    this.peek = function () { //Returns the top value
        return (this.isEmpty() || this.top == null)? null: this.top.next.payload
    };

    this.push = function (item) {
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.push(item[i]);
        } else {
            var n = new Node(item, this.top);
            this.top = n;
        }
        return this
    };
    if (arr) this.push(arr);

    this.pop = function (n) {
        if (!this.isEmpty()) throw new Error("I can't pop from an empty stack list");
        if (n) {
            for(var i = 0; i < n; i++) this.pop();
        } else {
            var el = this.top.payload;
            this.top = this.top.next;
            return el
        }
    };

    this.isEmpty = function () {
        return this.top == null
    };

    this.size = function (n) {
        return this.top != null? this.size(n + 1): n
    };

    return this;
}

/**
 * @description Queue
 * @param {Array|*} [arr] Array or element
 * @param {number|null} [lim=null] Limit
 * @returns {Queue} Queue
 * @this Queue
 * @constructor
 * @since 1.0
 */
function Queue (arr, lim) {
    this.value = isType(lim, "Number")? new Array(lim): [];
    this.limit = lim || null;
    if (arr) this.value.push(arr);

    this.enqueue = function (item) {
        if (this.isFull()) throw new Error("Queue overflow !");
        isType(item, "array")? this.value.preppend(item): this.value.unshift(item);
    };

    this.dequeue = function () {
        if (this.isEmpty()) throw new Error("Queue underflow !");
        var it = this.head();
        this.value.pop();
        return it
    };

    this.head = function () { //Returns the first value
        return this.value.last()
    };

    this.tail = function () { //Returns the last value
        return this.value[0]
    };

    this.isEmpty = function () {
        return this.value.length === 0
    };

    this.isFull = function () {
        return this.lim != null? this.value.length >= this.limit: false
    };

    this.size = function () {
        return this.value.length
    };

    this.toString = function () {
        return "Queue(head = " + this.head() + ", tail = " + this.tail() + ", value = " + this.value.toString() + ")"
    };

    this.equals = function (queue) {
        return this.toString() === queue.toString()
    };

    return this;
}

/**
 * @description Queue array
 * @param {Array|*} [arr=[]] Array or element
 * @returns {QueueArray} QueueArray
 * @this QueueArray
 * @constructor
 * @since 1.0
 */
function QueueArray (arr) {
    this.value = arr || [];
    this.front = -1;
    this.back = -1;

    this.enqueue = function (item) {
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.enqueue(item[i]);
        } else {
            if (this.isFull()) throw new Error("The queue is full");
            if (this.isEmpty()) {
                this.front++;
                this.back++;
                this.value[this.back] = item;
            } else {
                this.back = (this.back + 1) % this.value.length;
                this.value[this.back] = item;
            }
        }
    };

    this.dequeue = function () {
        var val;
        if (this.isEmpty()) throw new Error("I can't dequeue from an empty queue");
        if (this.front === this.back) {
            val = this.value[this.front];
            this.front = this.back = -1;
        }else {
            val = this.value[this.front];
            this.front = (this.front + 1) % this.value.length;
        }
        return val
    };

    this.isEmpty = function () {
        return this.front === -1 && this.back === -1
    };

    this.isFull = function () {
        return this.back>(this.front + 1) % this.value.length
    };

    this.size = function () {
        return this.value.length
    };

    this.toString = function () {
        return "Queue(front = " + this.front + ", back = " + this.back + ", value = " + this.value.toString() + ")"
    };

    this.equals = function (queue) {
        return this.toString() === queue.toString()
    };

    return this;
}

/**
 * @description Queue list
 * @this QueueList
 * @returns {QueueList} QueueList
 * @todo Probably add the pre-init similar to StackList() ?
 * @constructor
 * @since 1.0
 */
function QueueList () {
    this.front = null;
    this.back = null;
    this.len = 0;

    this.enqueue = function (item) {
        if (isType(item, "array")) {
            for(var i = 0; i < item.length; i++) this.enqueue(item[i]);
        } else {
            var n = this.back != null? new Node(item, this.back, null): new Node(item);
            if (this.back.prev != null) this.back.prev = n;
            this.back = n;
            this.len++;
        }
        return this
    };

    this.dequeue = function () {
        if (this.isEmpty()) throw new Error("I can't dequeue an empty queue list");
        this.front = this.front.prev;
        this.len--;
        return this.front
    };

    this.isEmpty = function () {
        return this.len === 0 || this.back === null
    };

    this.size = function () {
        return this.len
    };

    this.toString = function () {
        var str = "", crt = this.front;
        while (crt != null) {
            str += "<-"+ crt.payload;
            crt = crt.prev;
        }
        return str
    };

    this.equals = function (queue) {
        return this.toString() === queue.toString()
    };

    this.remove = function (pl) {
        var crt = this.front;
        while (crt != null) {
            if (crt.payload != null && (crt.payload == pl || crt.payload.equals(pl))) crt = null;
            crt = crt.next;
        }
    };

    this.insertAt = function (i, pl) {
        this.back.next = new Node(pl);
        if (i === 0) this.front = new Node(pl);
        else if (i === this.len) this.back = new Node(pl);
        else if (i > this.len) this.enqueue(pl);
    };

    return this;
}

/**
 * @description A* path finding algorithm
 * @todo Make sure it works properly
 * @param {PathNode} start Starting node
 * @param {PathNode} goal Ending node
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function Astar (start, goal) {
    //Inspired from http://Heyes-jones.com/pseudocode.php
    //PathNode.f (score) = g (sum of all cost to get at this point) + h (heuristic: estimate of what it will take to get the goal)
    var nodeGoal = goal, nodeCurrent, nodeSuccessor, _h;
    var openList = [start], closedList = [];
    while (openList.length > 0) {
        var scores = [], minScore = openList[0].f;
        for (var i in openList) {
            if (openList.hasOwnProperty(i)) {
                scores.push(openList[i].f);
                minScore = Math.min(minScore, openList[i].f);
            }
        }
        nodeCurrent = openList.filter(function (x) {
            if (x.f === minScore) return x
        })[0];
        openList = openList.filter(function (x) {
            if (x.f != minScore) return x
        });
        if (nodeCurrent === nodeGoal) {
            //Generate each states nodeSucessor that can come after nodeCurrent
            for (nodeSucessor in nodeCurrent) {
                if (nodeCurrent.hasOwnProperty(nodeSuccessor)) {
                    nodeSuccessor.f = nodeCurrent.f + h(nodeSuccessor, nodeCurrent);
                    var l = lookfor(nodeSuccessor, openList);
                    if (l != -1) {
                        l = l[0];
                        //If the current node is better then continue
                        if (nodeCurrent.f < openList[l] || (lookfor(nodeSuccessor, closedList) != -1 && nodeCurrent.f < openList[lookfor(nodeSuccessor, closedList)][0])) continue;
                        openList = openList.remove(nodeSuccessor);
                        closedList = closedList.remove(nodeSuccessor);
                        nodeSuccessor.parent = nodeCurrent;
                        _h = h(nodeSuccessor, nodeGoal);
                        openList.push(nodeSuccessor);
                    }
                    closedList.push(nodeCurrent);
                }
            }
            throw "Solution found ! With h=" + _h;
        }
    }
}

/**
 * @description A* algorithm v2
 * @param {number[]} start Starting node
 * @param {number[]} goal Ending node
 * @param {Array} grid Grid
 * @returns {undefined}
 * @since 1.0
 * @func
 */
function A(start, goal, grid) { //JS version of https://en.wikipedia.org/wiki/A*_search_algorithm
    var closedSet = [], openSet = [start], cameFrom = [], gScore = [0], fScore = [euclidianDist(start, goal)];

    while (openSet.length > 0) {
        var current = openSet[fScore.indexOf(fScore.min())];
        if (current === goal) return reconPath(cameFrom, current, grid);
        openSet = openSet.remove(current);
        closedSet.push(current);
        var n = grid.neighbour(current[0], current[1]);
        Essence.say("neighbour of " + current + ":\n" + n.toStr(true), "info");
        for (var i = 0; i < n; i++) {
            if (closedSet.indexOf(n[i]) > -1) continue;
            var tentativeGScore = gScore[closedSet.indexOf(current)] + 1;
            if (closedSet.indexOf(n[i]) === -1) openSet.push(n[i]);
            else if (tentativeGScore >= gScore[i]) break;
        }

        cameFrom[i] = current;
        gScore[i] = tentativeGScore;
        fScore[i] = gScore[i] + euclidianDist(n[i], goal);
    }
}

/**
 * @description Path reconstructor
 * @param {Array} cameFrom List of visited nodes
 * @param {Array} current Current node
 * @param {Array} grid Grid
 * @returns {Array} Reconstructed path
 * @since 1.0
 * @func
 */
function reconPath(cameFrom, current, grid) {
    var totalPath = [current];
    while (current in keyList(cameFrom)) {
        current = cameFrom[grid.lookFor(current)];
        totalPath.append(current);
    }
    return totalPath;
}

/**
 * @description Iterative Depending A* path finding algorithm
 * @returns {undefined}
 * @since 1.0
 * @func
 * @see Astar
 * @todo Do it !
 */
function IDAstar () {

}

/**
 * @description Sort alphabetically an string|array
 * @param {string|Array} x String/array to alphabetically sort
 * @returns {string|Array} Sorted string|array
 * @since 1.0
 * @func
 */
function alphabetSort (x) {
    if (!x.isIterable()) throw new Error("alphabetSort cannot sort non iterable objects");
    if (isType(x, "String")) return x.split("").quickSort().join("");

    var res = x.uniform(), s = true, j = 1;
    while (s) {
        s = false;
        for (var k = 0; k < res.maxLength(); k++) {
            for (var i = 0; i < res.length - j; i++) {
                if (k == 0 && res[i].charAt(k) > res[i + 1].charAt(k)) { //Sort the by the first letter
                    swap(res, i, i + 1);
                    s = true;
                } else if (res[i].charAt(k - 1) === res[i + 1].charAt(k - 1) && res[i].charAt(k) > res[i + 1].charAt(k)) {
                    swap(res, i, i + 1);
                    s = true;
                }
            }
            j++;
        }
    }
    return res.trimAll("r")
}

/**
 * @description Sort the array/string from the most occurring item to the least occurring ones
 * @param {Array|string} arr Array/string to sort
 * @returns {Array} Sorted occurrence list
 * @todo Improve because it's not right all the time
 * @since 1.0
 * @func
 */
function occurrenceSort(arr) {
    var tmp = rmDuplicates(arr), res = [];
    var counts = tmp.map(function (x) {
        return arr.count(x);
    });
    console.log("tmp", tmp, "\ncounts", counts);
    while (tmp.length > 0) {
        console.log(" tmp", tmp, "\ncounts", counts);
        for (var i = 0; i < tmp.length; i++) {
            if (counts[i] === counts.max()) {
                res.push(tmp[i]);
                counts = counts.remove(counts[i]);
                tmp = tmp.remove(tmp[i]);
            }
        }
    }
    return res;
}

/**
 * @description 2nd occurrence sorting alg
 * @todo Work on it !
 * @param {Array} arr Array to sort
 * @returns {{}} Result
 * @func
 * @since 1.1
 */
function occSort (arr) {
    var counts = arr.map(function (x) {
        return arr.count(x);
    }), vals = rmDuplicates(arr);
    var lookup = Objectify(vals, counts);

    return lookup;
}

/**
 * @description Find if x is in the list
 * @param {Array} list List
 * @param {*} x Element/term to find
 * @returns {boolean} Found or not
 * @since 1.0
 * @func
 */
function binarySearch (list, x) {
    list.quickSort();
    var i = 2, term = list[Math.floor(list.length / i)];
    while (term != x && i > 0) {
        if (term === x) return true;
        else {
            i *= 2;
            term = term < x? list[Math.floor(list.length / i)]: list[3 * Math.floor(list.length / i)];
        }
    }
    return term === x
}

/**
 * @description Compressed data using Huffman's approach while differentiating uppercase from lowercase letters
 * @param {string} [name="Archive"] Name of the archive
 * @param {string} [data=""] Data to compress
 * @returns {Archive} Archive
 * @constructor
 * @this {Archive}
 * @since 1.0
 */
function Archive (name, data) { //Compressed data using Huffman's approach while differentiating uppercase and lowercase letters
    this.name = name || "Archive";
    this.data = data || ""; //Data to compress
    this.dictionnary = []; //Values should be in the format: letter = bitcode
    this.result = [];
    this.updateDict = function () {
        var lexiq = [], count, tmp = alphabetSort(data);
        for (var i = 0; i < this.data.length - 1; i++) { //Fill lexiq
            if (tmp[i] != tmp[i+ 1]) lexiq.push(tmp[i]);
        }
        lexiq = rmDuplicates(lexiq);
        //lexiq.debug();
        //console.log(lexiq.getOccurrences());
        count = new Array(lexiq.length);
        tmp = [];
        for (i = 0; i < lexiq.length; i++) {
            count[i] = data.count(lexiq[i]);
            //Essence.say("lexiq[" + i + "]=" + lexiq[i] + " is present " + timesLiteral(count[i]), "inf");
            tmp[i] = lexiq[i] + count[i];
        }
        //Essence.say("Lexiq of " + this.name + ": " + lexiq + "\ncounts: " + count);

        this.dictionnary = occurrenceSort(this.data);

        for (i = 0; i < this.dictionnary.length; i++) this.result[i] = conv(i, 10, 2);
    };

    this.getResult = function () {
        this.updateDict();
        var res = this.data;
        for (var i = 0; i < this.data.length; i++) {
            console.log(i + "// " + this.dictionnary[this.dictionnary.indexOf(this.data[i])]);
            res = res.replace(RegExpify(this.dictionnary[this.dictionnary.indexOf(this.data[i])]), this.result[i]);
        }

        return res;
    };
    return this
}

/**
 * @description State history allowing undos and redos on the element while keeping track of the previous and following states
 * @param {*} elm Element
 * @this {virtualHistory}
 * @constructor
 * @returns {virtualHistory} Virtual history
 * @since 1.0
 */
function virtualHistory (elm) {
    this.src = elm;
    this.DEFAULT_STATE = elm;
    this.states = new Set(this.src);
    this.state = 0;

    this.reset = function () { //Go back to the default state
        this.src = this.DEFAULT_STATE;
    };

    this.update = function (elm) { //Update the current state if needed
        if (this.src != elm) this.add(elm);
    };

    this.add = function (val) { //Add a state
        if (isType(val, "array")) {
            for (var i = 0; i < val.length; i++) this.add(val[i]);
        } else {
            this.src = val;
            this.states.add(this.src);
            this.state++;
        }
    };

    this.get = function (i) {
        return this.states.get(i)
    };

    this.undo = function () {
        if (this.state === 0) throw new Error("Set underflow, it's not possible to undo to a non-existent state.");
        this.state--;
        this.src = this.get(this.state);
    };

    this.redo = function () {
        if (this.state === (this.states.size() - 1)) throw new Error("Set overflow, it's not possible to redo to a non-existent state.");
        this.state++;
        this.src = this.get(this.state);
    };

    this.getStates = function () {
        return this.states.toString()
    };

    this.isStateDefault = function () { //Check if the current state is the default
        return this.src === this.DEFAULT_STATE
    };

    return this;
}

/**
 * @description Get the occurence list
 * @param {string} list String
 * @returns {{}} Occurent object list
 * @since 1.0
 */
function occurrenceList (list) {
    if (!list.isIterable()) throw new Error("It must be an iterable object !");
    var nums = list.getOccurrences(true), chars = [], oc = list.getOccurrences(), res = {};
    for (var i = 0; i < oc.length; i++) chars[i] = oc[i].split(":")[0];
    for (i = 0; i < nums.length; i++) res[chars[i]] = nums[i];
    return res;
}

/**
 * @description Stream
 * @param {number} [initVal=0] Initial value
 * @param {string} [formula="x + 1"] Formula
 * @param {number} [nbVals] Number of values
 * @this {Stream}
 * @returns {Stream} Stream
 * @constructor
 * @since 1.0
 */
function Stream (initVal, formula, nbVals) {
    this.start = initVal || 0;
    this.formula = formula || "x + 1";
    this.data = [this.start];

    this.next = function () { //use PEG.js to solve the issue ?
        this.data.push(eval(this.formula.multiReplace([
            [/x/g, this.data.last()], [/x0/g, this.start],
            [/pi/ig, Math.PI], [/e/ig, Math.E], [/sqrt(2)/ig, Math.SQRT2],
            [/(pow|max|min)\((.*?),(| )(.*?)\)/, "Math.$1($2, $3)"],
            [/(sqrt|cbrt|cos|sin|tan|acos|asin|cosh|sinh|tanh|acosh|asinh|atanh|exp|abs)\((.*?)\)/, "Math.$1($2)"],
            [/(ln|log|nthroot|clampTop|clampBottom)\((.*?),(| )(.*?)\)/, "$1($2, $3)"],
            [/(clamp)\((.*?),(| )(.*?),(| )(.*?)\)/, "$1($2, $3, $)"],
        ])));
    };

    if (nbVals) {
        for (var i = 1; i < nbVals; i++) this.next();
    }

    this.toString = function () {
        return "Stream(start=" + this.start + ", formula=" + this.formula + ", data=" + this.data.toStr(true) + ")";
    };

    return this;
}

/**
 * @description Stream with multiple variables
 * @param {number} [initVal=0] Initial value
 * @param {string} [formula="x + y"] Formula
 * @param {number} [nbVals] Number of values
 * @returns {MultiStream} Multi-variable stream
 * @this {MultiStream}
 * @constructor
 * @since 1.0
 */
function MultiStream (initVal, formula, nbVals) { //Stream with multiple variables
    this.start = initVal || 0;
    this.formula = formula || "x + y";
    this.data = [this.start];
    this.results = [];

    this.next = function () { //use PEG.js to solve the issue ?
        this.data.push(this.data.last().map(function (x) {
            return x + 1;
        }));
        this.results.push(this.compute(this.data.last()));
    };

    this.compute = function (data) { //Turn an expression into a number
        return eval(this.formula.multiReplace([
            [/x/g, data[0]], [/x0/g, this.start[0]],
            [/y/g, data[1]], [/y0/g, this.start[1]],
            [/z/g, data[2]], [/z0/g, this.start[2]],
            [/pi/ig, Math.PI], [/e/ig, Math.E], [/sqrt(2)/ig, Math.SQRT2],
            [/(pow|max|min)\((.*?),(| )(.*?)\)/, "Math.$1($2, $3)"], //fails on first occurrence
            [/(sqrt|cbrt|cos|sin|tan|acos|asin|cosh|sinh|tanh|acosh|asinh|atanh|exp|abs|e\^)\((.*?)\)/, "Math.$1($2)"],
            [/(ln|log|nthroot|clampTop|clampBottom)\((.*?),(| )(.*?)\)/, "$1($2, $3)"],
            [/(clamp)\((.*?),(| )(.*?),(| )(.*?)\)/, "$1($2, $3, $4)"]
        ]))
    };

    this.results = [this.compute(this.start)];

    if (nbVals > 1) {
        for (var i = 1; i < nbVals; i++) this.next();
    }

    this.toString = function () {
        return "Stream(start=" + this.start.toStr(true) + ", formula=" + this.formula + ", data=" + this.data.toStr(true) + ", results=" + this.results.toStr(true) + ")";
    };

    return this;
}

/**
 * @description Numerical graph
 * @param {string} formula Formula
 * @param {number[]} [dims=[50, 50]] Dimensions
 * @param {string[]} [lbls=["x", "y"]] Axis labels
 * @param {string} [name="Graph"] Name
 * @param {number} precision Precision
 * @returns {Graph} Numerical graph
 * @this {Graph}
 * @constructor
 * @since 1.0
 */
function Graph (formula, dims, lbls, name, precision) { //N-dimensional graph
    this.labels = lbls || ["x", "y"];
    this.name = name || "Graph";
    this.dimension = dims || new Array(this.labels.length).fill(50);
    this.equation = new Equation(formula); //y=...
    // this.stream = new Stream(0, this.formula.split("=")[1], this.dimension[0]);
    this.data = precision? range(0, precision, this.dimension[0], (Number(precision)).length()[1]): range(this.dimension[0]);
    for (var i = 0; i < this.data.length; i++) this.data[i] = [this.data[i], this.equation.compute({x: this.data[i]})];

    this.toString = function () {
        return "Graph(name=" + this.name + ", labels=" + this.labels.toStr(true) + ", dimension=" + this.dimension + ", this.formula=" + this.formula + ", data=" + this.data + ")";
    };

    return this;
}

/**
 * @description Permutation
 * @param {string|Array} data Data
 * @todo Make it work well
 * @returns {string|Array} Permuation list
 * @since 1.0
 */
function Permutation(data) {
    console.log("data=" + data);
    console.log("->" + data.get(-1));
    var perm = [data];
    perm.append((data.length > 1)? Permutation(data.get(-1)): data);
    console.log("perm=" + perm);
    return perm;
}

/**
 * @description Event-trace table
 * @param {string} [name="Event table"] Name
 * @param {string[]} [srcs=[getFilename(true)]] Sources
 * @returns {EventTable} Event table
 * @constructor
 * @this {EventTable}
 * @since 1.0
 */
function EventTable(name, srcs) {
    this.name = name ||"Event table";
    this.sources = srcs || [getFilename(true)];
    this.table = [["Source", "Event", "Timestamp"]];
    this.add = function (evt) {
        this.table.push([evt.source || getFilename(true), evt.event, evt.timestamp || (new Date()).getTime()]);
        this.sources.uniquePush(evt.source || getFilename(true));
    };

    this.make = function (nb, space) {
        var ts = (new Date()).getTime();
        if(!space) space = 1;
        for (var i = 0; i < (nb || 1e3); i += space) {
            this.add({
                timestamp: ts + i
            });
        }
    };

    this.fill = function (src, desc) {
        var ts = (new Date()).getTime();
        var pos = lookfor(ts, this.table);
        if (pos === -1 && ts > this.table.last()[2]) this.add({source: src, event: desc, timestamp: ts});
        else {
            this.table[pos[0]][0] = src;
            this.table[pos[0]][1] = desc;
        }
    };

    this.getCleanTable = function () {
        var table = [];
        for (var i = 0; i < this.table.length; i++) {
            if (!isNon(this.table[i][1])) table.push(this.table[i]);
        }

        return table;
    };

    this.lookAt = function (ts) {
        var pos = lookfor(ts || (new Date()).getTime(), this.table)[0];
        return "'" + this.table[pos][1] + "' at " + this.table[pos][0];
    };

    return this;
}

//will be depreciated by Map in ES6
/**
 * @description Map (Hashless Hashmap).
 * It's depreciated in the next version (in favour of ES6) and will have the following methods instead:
 *
 * @param {*} [keys=[]] Keys
 * @constructor
 * @this {Map}
 * @returns {Map} Map
 * @since 1.1
 */
function Map (keys) {
    this.keys = new Set(keys || []);
    this.values = //Objectify(this.keys.value, new Array(this.keys.size()).fill([]));
    this.add = function (key, value) {
        Essence.say("Adding key/value: " + key + " / " + value);
        if (isType(key, "Array") && isType(value, "Array")) {
            for (var i = 0; i < key; i++) this.add(key[i], value[i]);
            Essence.say("Multi")
        } else if (isType(key, "Array")) {
            for (i = 0; i < key; i++) this.add(key[i], value);
            Essence.say("Multi key");
        }
        this.keys.add(key);
        if (this.values[key] === undefined) this.values[key] = [];
        this.values[key].push(value || null);
    };
    this.clear = function (key) {
        key? this.values[key] = []: this.keys = new Set();
    };
    this.has = function (val) {
        for (var k in this.keys) {
            if (this.keys.hasOwnProperty(k) && this.keys[k].indexOf(val) > -1) return true;
        }
        return false;
    };
    this.hasKey = function (key) {
        return this.keys.contains(key);
    };
    this.size = function () {
        var el = this.values;
      return this.keys.value.map(function (k) {
          return el[k].length;
      });
    };
    this.elements = function (spaced) {
        var el = this.values;
        return this.keys.value.map(function (k) {
            return spaced? el[k].toStr(true): el[k].toString();
        }).toStr(true);
    };
    this.isEmpty = function () {
        return this.keys.isEmpty(); //No need to check the values
    };
    this.get = function (key) {
        return this.values[key];
    };
    this.remove = function (key, value) {
        value? this.values[key] = this.values[key].remove(value): this.keys.remove(key);
    };
    this.toString = function () {
        return "Map(key/values=" + this.values.toArray().toStr(true) + ")";
    };
    this.forEach = function (act) {
        for (var i = 0; i < this.keys.size(); i++) act(this.keys.get(i));
    };
    this.merge = function (table) {
        this.keys.add(table.keys.value, table.values);
    };
    this.set = function (key, value) {
        this.keys.set(this.keys.indexOf(key), value);
    };
    this.replace = function (key, oldVal, newVal) {
        if (this.values[key].indexOf(oldVal) > -1) this.values[key] = this.values[key].replace(oldVal, newVal);
    };
    this.replaceAll = function (oldVal, newVal) {
        var self = this;
        this.forEach(function (k) {
            self.replace(k, oldVal, newVal);
        });
    };
    return this;
>>>>>>> 4dd0ddfc485b6426448ba21d404b62492c783a9b
}
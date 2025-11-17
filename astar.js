class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.parent = null
  }

  equals(other) {
    return this.x == other.x && this.y == other.y
  }

  // h function (straight line distance to the end)
  dist_to_end(end) {
    return Math.sqrt((this.x - end.x) ** 2 + (this.y - end.y) ** 2)
  }

  // g function (path distance to start)
  dist_to_start(start) {
    // TODO: This is very slow, we should have a dist_to_start tracked as we go
    if (this.equals(start)) {
      return 0;
    } else {
      return 1 + this.parent.dist_to_start(start)
    }
  }

  // f function (heuristic)
  heuristic(start, end) {
    return this.dist_to_start(start) + this.dist_to_end(end);
  }
}

// TODO: Create the graph (using these nodes) from an adjacency list

let node = new Node(10, 15);
console.log(node.dist_to_end(new Node(15, 20)));
console.log(node)


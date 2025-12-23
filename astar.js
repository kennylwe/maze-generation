export class Node {
  constructor(x, y, adj) {
    this.x = x;
    this.y = y;
    this.adj = adj;
    this.parent = null;
  }

  equals(other) {
    return this.x == other.x && this.y == other.y;
  }

  // f function (straight line distance to the end)
  dist_to_end(end) {
    return Math.sqrt((this.x - end.x) ** 2 + (this.y - end.y) ** 2);
  }

  // g function (path distance to start)
  dist_to_start(start) {
    // TODO: This is slow, we should have a dist_to_start tracked as we go
    if (this.equals(start)) {
      return 0;
    } else if (this.parent == null) {
      return null;
    } else {
      return 1 + this.parent.dist_to_start(start);
    }
  }

  // h function (heuristic)
  heuristic(start, end) {
    return this.dist_to_start(start) + this.dist_to_end(end);
  }

  get_path_from(start) {
    if (this.equals(start)) {
      return [];
    } else {
      return getpath(start, this.parent) + [this];
    }
  }
}

export function find_node(graph, x, y) {
  for (let node of graph) {
    if (node.x == x && node.y == y) {
      return node;
    }
  }
  throw new Error("Failed to find node", x, y);
}

export function init_graph(adjs) {
  let graph = [];
  for (let x of Object.keys(adjs)) {
    let [i, j] = x.split(",");
    graph.push(new Node(parseInt(i), parseInt(j), []));
  }

  for (let node in adjs) {
    let [x, y] = node.split(",");
    let astar_node = find_node(graph, parseInt(x), parseInt(y));
    astar_node.adj = adjs[node];
  }

  console.log(graph);

  return graph;
}


function toTravel(open,graph) {
  let lowesth;
  for (let h of open) {
    h = find_node(graph,h[0],h[1]);
    if (h.heuristic() < lowesth) {
      lowesth = h.heuristic();
    }
  }
  for (let h of open) {
    if (h.heuristic() == lowesth) {
      return h;
    }
  }
  return null;
}


function getNeighbors(node, graph) {
  let neighbors = [];
  let y = 0;
  let x = 0;

  for (let dx of [-1, 1]) {
    x = node.x + dx;
    if (x < graph[0].length) {
      neighbors.push([x, node.y]);
    }
  }
}

export function run_astar(graph, start, end) {
  // Get all explorable nodes
  // Find the lowest heuristic explorable node
  // Explore that node
  //     - Make nodes around it explorable (all)
  //     - Check neighbors (in closed), see which parent is shortest
  //     - Fix neighbors (in closed), see if setting their parent to this node is better
  // Repeat until we get to end
  let open = [start]; // explorable (all nodes on the "boundary")
  let closed = []; // Already explored (visited)
  let neighbors;
  //get lowest H value in open
  //for x in open
  //  find lowest h value
  //current = node_lowest_h
  //if current == end:
  //  stop loop
  //add to closed
  //take out of open
  //with that node in closed get neighbors of that node
  //neighbors = getNeighbors(current)
  //for y of neighbors
  //  if node in open AND path is shorter, then set that node as parent of y
  //
  //for x in neighbors
  //  add to open if not in closed
  //  set x.parent to current
  //
  //repeat
  while (true) {
    current = toTravel(open,graph);
    if (current == end) {
      break;
    }
    closed.push(current);
    open = open.filter(x => (!x.equals(current)));
    neighbors = getNeighbors(current, graph);
    for (y of neighbors) {
      if (y.includes(open) && y.parent.dist_to_start(start) > current.dist_to_start(start)) {
        y.parent = current;
      }
    }
    for (n of neighbors) {
      if (!closed.includes(n)) {
        open.push(n);
        n.parent = current;
      }
    }
    // A Star here!

  }
  return end.get_path_from(start);
}



class Node {
  constructor(x, y, adj) {
    this.x = x;
    this.y = y;
    this.adj = adj;
    this.parent = null;
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

  get_path_from(start) {
    if (this.equals(start)){
      return [];
    } else {
      return getpath(start, this.parent) + [this];
    }
  }



}

function init_graph(adjs) {
  let graph = [];
  for (let x of Object.keys(adjs)) {
    let [i, j] = x.split(",");
    graph.push(new Node(parseInt(i), parseInt(j), []));
    console.log(graph);

    // Go through adjacency list again
    // For each adjacent node, FIND the node that corresponds with it
    //      Add it to its adjacency
  }

  for (let adjls of adjs) {
    for (let adj of adjls) {
      for (let conode of adjs) {
        if (adj[0] == conode[0] && adj[1] == conode[1]) {
          
        }
      }
    }
  }


  return graph;
}


function astar(graph, start, end) {
  // Get all explorable nodes
  // Find the lowest heuristic explorable node
  // Explore that node
  //     - Make nodes around it explorable (all)
  //     - Check neighbors (in closed), see which parent is shortest
  //     - Fix neighbors (in closed), see if setting their parent to this node is better
  // Repeat until we get to end

  open = []  // explorable (all nodes on the "boundary")
  closed = []  // Already explored (visited)
  current = start

  while (!current.equals(end)) {
    open = 

    // A Star here!
  }

  return end.get_path_from(start)
}


init_graph(adjs)



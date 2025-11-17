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

//Go through each adjacency list again
//for each adjacency node find node that corresponds to it
//    add it to adjacency




let node = new Node(10, 15);
console.log(node.dist_to_end(new Node(15, 20)));
console.log(node)


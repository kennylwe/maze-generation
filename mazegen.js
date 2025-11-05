const SIZE = 10;

function makeMaze(){

   let graph = {

   };
   let node = [0,0];
   console.log(node);
   let visited = new Set();
   graph = maze(graph, node, visited);
   return graph;
}


function findNeighbors(grid, node) {
   let neighbors = [];
   let y = 0;
   let x = 0;
   for (let di of [-1, 0, 1]) {
      x = node[0] + di;
      if (x >= 0 && x < SIZE && !(di == 0)) {
         neighbors.push([x, y]);
       }
     }
   x = 0;
   for (let dj of [-1, 0, 1]) {
      y = node[1] + dj;
      if (y >= 0 && y < SIZE && !(dj == 0)) {
         neighbors.push(x,y);
      }
   }
   return neighbors;

}


function addEdge(node, neighbor) {
   return [neighbor]
   
}

function maze(graph, node, visited) {
   let neighbors = findNeighbors(graph, node);
   for (let neighbor of neighbors) {
      if (neighbor in visited) {
         continue;
      }
      visited.add(node);

      console.log(graph);
      graph[node] = addEdge(node, neighbors);
      maze(graph, neighbor, visited);
   }
   return graph;

}

let graph = makeMaze();
console.log(graph);

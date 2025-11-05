const SIZE = 10;

function makeMaze(){

   let graph = {

   };
   let node = [0,0];
   let visited = new Set();
   graph = maze(graph, node, visited);
   return graph;
}


function findNeighbors(graph, node) {
   let neighbors = [];
   let y = 0;
   let x = 0;
   console.log(node);
   for (let di of [-1, 1]) {
      x = node[0] + di;
      if (x >= 0 && x < SIZE) {
         neighbors.push([x, y]);
       }
     }
   x = 0;
   for (let dj of [-1, 1]) {
      y = node[1] + dj;
      if (y >= 0 && y < SIZE) {
         neighbors.push([x,y]);
      }
   }
   return neighbors;

}


function addEdge(graph, node, neighbor) {
   return [graph[node], neighbor];
}


function maze(graph, node, visited) {
   let neighbors = findNeighbors(graph, node);

   console.log("bing");
   console.log(visited);

   console.log("bong");
   console.log(neighbors);
   for (let neighbor of neighbors) {
      if (neighbor in visited) {
         console.log("hello");
         continue;
      }
      visited.add(node);


      graph[node] = addEdge(graph, node, neighbor);
      //graph[node] = addEdge(node, neighbors);
      maze(graph, neighbor, visited);
   }
   return graph;

}

let graph = makeMaze();
console.log(graph);

const SIZE = 5;

function makeMaze(){

   let graph = {

   };
   let node = [0,0];
   let visited = new Set();
   graph = maze(graph, node, visited);

   let grid = makeGrid();

   for (let point in graph) {
      console.log(point);
      console.log(graph[point]);
      console.log(graph[point].length);
      grid[point[0], point[1]] = graph[point].length;
   }
   return grid;
}

function findNeighbors(graph, node) {
   let neighbors = [];
   let y = 0;
   let x = 0;
   //console.log(node);
   for (let di of [-1, 1]) {
      x = node[0] + di;
      if (x >= 0 && x < SIZE) {
         neighbors.push([x, node[1]]);
       }
     }
   x = 0;
   for (let dj of [-1, 1]) {
      y = node[1] + dj;
      if (y >= 0 && y < SIZE) {
         neighbors.push([node[0],y]);
      }
   }
   return neighbors;
}



//add edge to node in graph
function addEdge(graph, node, neighbor) {
   let placer;
   if (typeof graph[node] === "undefined") {
      placer = [];
   }
    else {
       placer = [graph[node]];
   }
   placer.push(neighbor);
   return placer;
   
}

//compare if list is in set visited
function compareValues(neighbor, visited) {
   for (let item of visited.keys()) {
      if (item.toString() == neighbor.toString()) {
         return true;
      }
   }
   return false;
   
}

function reOrder(neighbors) {
   let currentI = neighbors.length;
   let randomI;
   while(currentI!= 0) {
      randomI = Math.floor(Math.random() * currentI);
      currentI--;
      [neighbors[currentI], neighbors[randomI]] = [neighbors[randomI], neighbors[currentI]];
   }

   return neighbors;

}

function printGrid(grid) {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
       process.stdout.write(grid[i][j].toString());
    }
    console.log("");
  }
}


//main function
function maze(graph, node, visited) {
   let neighbors = findNeighbors(graph, node);
   neighbors = reOrder(neighbors);
   console.log(graph);

   for (let neighbor of neighbors) {
      if (compareValues(neighbor, visited)) {
         continue;
      }
      visited.add(node);
      console.log(graph);


      //graph[node] = addEdge(graph, node, neighbor);
      
      graph[node] = addEdge(graph, node, neighbors);
      
      maze(graph, neighbor, visited);
   }
   return graph;

}


function makeGrid(graph) {
   const grid = [];
   for (let i = 0; i < SIZE; i++) {
      let row = [];
      for (let j = 0; j < SIZE; j++) {
         row.push(0);
      }
      grid.push(row);
   }
   return grid;
}

let graph = makeMaze();
printGrid(graph);

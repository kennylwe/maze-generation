const SIZE = 10;

function makeMaze(){

   let graph = {};
   let node = [0,0];
   let visited = new Set();
   graph = maze(graph, node, visited);
   return graph;
}






function formatMaze(graph) {
   let grid = makeGrid();

   for (let point in graph) {
      point = point.split(",");
      grid[parseInt(point[0]) * 2 + 1][parseInt(point[1]) * 2 + 1] = " ";
      
   }
   // printGrid(grid);

   let xval = 0;
   let yval = 0;
   for (let point in graph) {
      for (let node of graph[point]) {
         if (typeof point === "string") {
           point = point.split(",")
           point = [parseInt(point[0]), parseInt(point[1])]
         }
         console.log(point)
         if (point[0] > node[0]) {
            xval = 1;
         } else if (point[0] < node[0]) {
            xval = -1;
         } else {
            xval = 0
         }
         if (point[1] > node[1]) {
            yval = 1;
         } else if (point[1] < node[1]) {
            yval = -1;
         } else {
            yval = 0
         }

         grid[node[0] * 2 + 1 + xval][node[1] * 2 + 1 + yval] = " ";
      }
 
     // grid[parseInt(graph[point][0]) * 2 + 1][parseInt(graph[point][1]) * 2 + 1] = ".";
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
      placer = graph[node];
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
  for (let i = 0; i < SIZE * 2 + 1; i++) {
    for (let j = 0; j < SIZE * 2 + 1; j++) {
       process.stdout.write(grid[i][j].toString());
    }
    console.log("");
  }
}


//main function
function maze(graph, node, visited) {
   let neighbors = findNeighbors(graph, node);
   neighbors = reOrder(neighbors);

      visited.add(node);

   for (let neighbor of neighbors) {
      if (compareValues(neighbor, visited)) {
         continue;
      }

      //graph[node] = addEdge(graph, node, neighbor);
      
      graph[node] = addEdge(graph, node, neighbor);
      graph[neighbor] = addEdge(graph, neighbor, node);
      
      maze(graph, neighbor, visited);
   }
   return graph;
}

function makeGrid(graph) {
   const grid = [];
   for (let i = 0; i < SIZE * 2 + 1; i++) {
      let row = [];
      for (let j = 0; j < SIZE * 2 + 1; j++) {
         row.push("#");
      }
      grid.push(row);
   }
   return grid;
}




function heuristic(current, end) {
   return abs(current[0] - end[0]) + abs(current[1] - end[1]);
}


function solveMaze(graph, end) {
   for (let node in graph) {
      continue;
   }
   
   return graph;
}








let graph = makeMaze();

let grid = formatMaze(graph);

printGrid(grid);

let newmaze = solveMaze(graph);



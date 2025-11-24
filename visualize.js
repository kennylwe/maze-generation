import "./mazegen.js";


const canvas = document.querySelector("#grid");
const ctx = canvas.getContext("2d");






function drawGrid(grid) {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let dy = canvas.height / (SIZE * 2 + 1);

   let dx = canvas.width / (SIZE * 2 + 1);

   for (let i = 0; i < SIZE * 2 + 1; i++) {
      for (let j = 0; j < SIZE * 2 + 1; j++) {
         if (grid[i][j] == "#") {
            ctx.fillRect(dx * i, dy * j, dx, dy);
         }
      }
   }
}

export function finalMaze() {
   let graph = makeMaze();
   let grid = formatMaze(graph);
   drawGrid(grid);
}
finalMaze()


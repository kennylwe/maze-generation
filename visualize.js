import { init_graph } from "./astar.js";
import { makeMaze, formatMaze, SIZE } from "./mazegen.js";

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

// NOTE: Temporarily here to generate the page on page load
finalMaze();

function drawInformation(f, g, parent, x, y, maxwidth, visited) {
  if (visited) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "green";
  }
  ctx.fillText(String(f), x - maxwidth * 0.5, y + maxwidth * 0.5, maxwidth);
  ctx.fillText(String(g), x + maxwidth * 0.5, y + maxwidth * 0.5, maxwidth);
  ctx.fillText(String(f + g), x - maxwidth * 0.5, y, maxwidth);
}

// 1. Write a function in visualize to draw the information on a square
//    - f, g, h, parent
//    - Test with fake nodes
// 2. Run [astar]'s [init_graph] to get the "real" nodes
//    - Don't worry about correct values
//    - Set fake values for parents
// 3. Color candidate / visited notes in some way
//    - Visited be red
//    - Candidates be green
//    - Make up fake values for this to test
// 4. Write tha actual Astar algorithm
//    - At each time we "search" a candidate node, update drawing
//    - Use this to debug!
//    - https://www.youtube.com/watch?v=-L-WgKMFuhE&t=569s

window.finalMaze = finalMaze;

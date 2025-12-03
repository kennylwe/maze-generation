import { init_graph } from "./astar.js";
import { makeMaze, formatMaze, SIZE } from "./mazegen.js";

const canvas = document.querySelector("#grid");
const ctx = canvas.getContext("2d");

// Double resolution of canvas
var scale = 2;
var displayWidth = 1000;
var displayHeight = 1000;
canvas.style.width = displayWidth + 'px';
canvas.style.height = displayHeight + 'px';
canvas.width = displayWidth * scale;
canvas.height = displayHeight * scale;

// Align text to center of node
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.font = "bold 20px Arial";

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

function drawNode(node, visited) {
  const width = canvas.width / (2 * SIZE + 1);
  let [x, y] = [(2 * node.x + 1) * width, (2 * node.y + 1) * width];
  if (visited) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "green";
  }
  // TODO: Fill in with [f], [g], and [h] valus
  // TODO: Fill in [parent] values
  ctx.fillText("TEST", x + (width * 0.5), y + (width * 0.5), width);
  ctx.fillStyle = "black";
}

function drawAStar(astar) {
  for (let node of astar) {
    // TODO: Replace with true [visited]
    drawNode(node, true);
  }
}

export function finalMaze() {
  let graph = makeMaze();
  let grid = formatMaze(graph);
  drawGrid(grid);
  let astar = init_graph(graph);
  drawAStar(astar);
}

// NOTE: Temporarily here to generate the page on page load
finalMaze();

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

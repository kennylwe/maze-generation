import { init_graph, astar } from "./astar.js";
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

function drawArrow(dx, dy, x, y, width) {
  ctx.beginPath();
  if (dx == 1) {
    ctx.moveTo((x + width * 0.5), y);
    ctx.lineTo(x + width, y + (width * 0.5));
    ctx.lineTo((x + width * 0.5), y + width);
  }
  if (dx == -1) {
    ctx.moveTo((x + width * 0.5), y);
    ctx.lineTo(x, y + (width * 0.5));
    ctx.lineTo((x + width * 0.5), y + width);
  }
  if (dy == 1) {
    ctx.moveTo(x, y + (width * 0.5));
    ctx.lineTo(x + (width * 0.5), y + width);
    ctx.lineTo((x + width), y + (0.5 * width));
  }
  if (dy == -1) {
    ctx.moveTo(x, y + (width * 0.5));
    ctx.lineTo(x + (width * 0.5), y);
    ctx.lineTo((x + width), y + (0.5 * width));
  }
  ctx.stroke()
}


function drawNode(node, visited, start, end) {
  const width = canvas.width / (2 * SIZE + 1);
  let [x, y] = [(2 * node.x + 1) * width, (2 * node.y + 1) * width];
  if (visited) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "green";
  }
  
  // TODO: Fill in with [f], [g], and [h] valus
  // TODO: Fill in [parent] values
  if (!(node.parent == null)) {
    let dx = node.parent[0] - node.x;
    let dy = node.parent[1] - node.y;
    drawArrow(dx, dy, x, y, width);
  }
  let g = Math.floor(node.dist_to_end(end));
  let f = Math.floor(node.dist_to_start(start));
  let h = Math.floor(node.heuristic(start, end));
  //draw heuristic
  ctx.fillText(h, x + (width * 0.5), y + (width * 0.5), width);
  //draw g value
  ctx.fillText(f, x + (width * 0.25), y + (width * 0.75), width);
  //draw f value
  ctx.fillText(g, x + (width * 0.75), y + (width * 0.75), width);
  ctx.fillStyle = "black";
}

function drawAStar(astar) {
  let start;
  let end;
  for (let node of astar) {
    if (node.x == 0 && node.y == 0) {
      start = node;
    }
    if (node.x == SIZE - 1 && node.y == SIZE - 1) {
      end = node;
    }
  }
  for (let node of astar) {
    // TODO: Replace with true [visited]
    drawNode(node, true, start, end);
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

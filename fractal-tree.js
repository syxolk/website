function drawLine(svg, x1, y1, x2, y2, depth) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#4e8c4e");
  line.setAttribute("stroke-width", Math.max(1, depth) / 2);
  svg.appendChild(line);
}

// Fractal Tree Renderer
function drawFractalTree(svg, x1, y1, angle, depth, branchLength) {
  if (depth <= 0) return;
  const rad = (angle * Math.PI) / 180;
  const x2 = x1 + branchLength * Math.sin(rad);
  const y2 = y1 - branchLength * Math.cos(rad);

  drawLine(svg, x1, y1, x2, y2, depth);

  drawFractalTree(svg, x2, y2, angle - 20, depth - 1, branchLength * 0.7);
  drawFractalTree(svg, x2, y2, angle + 45, depth - 1, branchLength * 0.7);
}

function renderFractalTree() {
  const container = document.querySelector(".fractal-tree");
  if (!container) return;
  container.innerHTML = "";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", 350);
  svg.setAttribute("height", 350);

  const viewBoxWidth = 400;
  const viewBoxHeight = 400;

  svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  const depth = 12;
  const trunkLenth = 50;

  // Draw the fractal tree
  drawFractalTree(
    svg,
    viewBoxWidth / 2,
    viewBoxHeight - trunkLenth,
    0,
    depth,
    100,
  );

  // Draw the trunk
  drawLine(
    svg,
    viewBoxWidth / 2,
    viewBoxHeight - trunkLenth,
    viewBoxWidth / 2,
    viewBoxHeight,
    depth,
  );

  container.appendChild(svg);
}

document.addEventListener("DOMContentLoaded", renderFractalTree);

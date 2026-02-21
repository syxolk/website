const namespace = "http://www.w3.org/2000/svg";

function drawLine(svg, x1, y1, x2, y2, depth) {
  const line = document.createElementNS(namespace, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#6B492B");
  line.setAttribute("stroke-width", Math.max(1, depth) / 2);
  svg.appendChild(line);
}

// Fractal Tree Renderer
function drawFractalTree(svg, x1, y1, angle, depth, branchLength, leaves) {
  if (depth <= 0) return;
  const rad = (angle * Math.PI) / 180;
  const x2 = x1 + branchLength * Math.sin(rad);
  const y2 = y1 - branchLength * Math.cos(rad);

  drawLine(svg, x1, y1, x2, y2, depth);

  if (depth === 1) {
    leaves.push({ x: x2, y: y2 });
  }

  drawFractalTree(
    svg,
    x2,
    y2,
    angle - 20,
    depth - 1,
    branchLength * 0.7,
    leaves,
  );
  drawFractalTree(
    svg,
    x2,
    y2,
    angle + 45,
    depth - 1,
    branchLength * 0.7,
    leaves,
  );
}

function renderFractalTree() {
  const container = document.querySelector(".fractal-tree");
  if (!container) return;
  container.innerHTML = "";
  const svg = document.createElementNS(namespace, "svg");
  svg.setAttribute("width", 350);
  svg.setAttribute("height", 350);

  const viewBoxWidth = 400;
  const viewBoxHeight = 400;

  svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  const depth = 12;
  const trunkLenth = 50;

  const leaves = [];

  // Draw the fractal tree
  drawFractalTree(
    svg,
    viewBoxWidth / 2,
    viewBoxHeight - trunkLenth,
    0,
    depth,
    100,
    leaves,
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

  for (const coord of leaves) {
    // Draw a small leaf at the end of the branch
    const leaf = document.createElementNS(namespace, "circle");
    leaf.setAttribute("cx", coord.x);
    leaf.setAttribute("cy", coord.y);
    leaf.setAttribute("r", 1.5);
    leaf.setAttribute("fill", "#ec9f9f");
    svg.appendChild(leaf);
  }

  console.log(`Number of leaves: ${leaves.length}`);

  container.appendChild(svg);
}

document.addEventListener("DOMContentLoaded", renderFractalTree);

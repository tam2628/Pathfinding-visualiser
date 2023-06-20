import { GridNode } from "./Node";

export function updateNeighbors(
  nodeGrid: GridNode[][],
  node: GridNode,
  rows: number,
  cols: number
) {
  const neighbors = getNeighbors(nodeGrid, node, rows, cols);
  neighbors.map((n) => {
    n.distance = node.distance + 1;
    n.previous = node;
  });
}

export function getNeighbors(
  nodeGrid: GridNode[][],
  node: GridNode,
  rows: number,
  cols: number
): GridNode[] {
  const neighbors: GridNode[] = [];

  try {
    if (node.col - 1 >= 0) neighbors.push(nodeGrid[node.row][node.col - 1]); //left
    if (node.row + 1 < rows) neighbors.push(nodeGrid[node.row + 1][node.col]); //down
    if (node.col + 1 < cols) neighbors.push(nodeGrid[node.row][node.col + 1]); // right
    if (node.row - 1 >= 0) neighbors.push(nodeGrid[node.row - 1][node.col]); //up
  } catch {
    throw new Error("Updating neighbors failed");
  }

  return neighbors.filter((n) => n.isVisited === false);
}

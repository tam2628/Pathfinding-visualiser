import { Grid } from "../Grid";
import { GridNode } from "../Node";
import { updateNeighbors } from "../neighbors";

export const dijkstra = (grid: Grid): GridNode[] => {
  const ROWS = grid.rows,
    COLS = grid.cols,
    START_ROW = grid.start.first,
    START_COL = grid.start.second,
    END_ROW = grid.end.first,
    END_COL = grid.end.second;

  let _grid = grid.grid;
  let visitedNodesInOrder: GridNode[] = [];
  let nodes = _grid.reduce((a, b) => [...a, ...b], []);

  _grid[START_ROW][START_COL].distance = 0;
  while (!!nodes.length) {
    nodes = nodes.sort((a, b) => a.distance - b.distance);
    const node = nodes.shift() as GridNode;
    if (node.isWall()) continue;
    if (node.distance === Infinity) return visitedNodesInOrder;

    node.isVisited = true;
    visitedNodesInOrder.push(node);

    if (node.row === END_ROW && node.col === END_COL)
      return visitedNodesInOrder;

    updateNeighbors(_grid, node, ROWS, COLS);
  }

  return visitedNodesInOrder;
};

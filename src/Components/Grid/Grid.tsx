import React, { useState } from "react";
import { DEFAULT_GRID_ROW, DEFAULT_GRID_COLUMN } from "../../consts";
import { Cell } from "./Cell";
import { Row } from "./Row";

interface GridProps {
  maxRow?: number;
  maxColumn?: number;
}

export const Grid: React.FC<GridProps> = ({
  maxRow = DEFAULT_GRID_ROW,
  maxColumn = DEFAULT_GRID_COLUMN,
}) => {
  const initialCellsStatus: Array<Array<boolean>> = [...Array(maxRow)].map(
    (row) => new Array(maxColumn).fill(false)
  );
  const [cellsStatus, setCellsStatus] = useState(initialCellsStatus);

  const toggleCellStatus = (row: number, column: number): void => {
    setCellsStatus((prevCellsStatus) => {
      const newCellsStatus = JSON.parse(JSON.stringify(prevCellsStatus));
      newCellsStatus[row][column] = !prevCellsStatus[row][column];
      return newCellsStatus;
    });
  };

  const getLiveNeighborsAmount = (row: number, column: number): number => {
    const lastRow = maxRow - 1;
    const lastColumn = maxColumn - 1;
    const topNeighborRow = row - 1 < 0 ? lastRow : row - 1;
    const bottomNeighborRow = row + 1 > lastRow ? 0 : row + 1;
    const leftNeighborColumn = column - 1 < 0 ? lastColumn : column - 1;
    const rightNeighborColumn = column + 1 > lastColumn ? 0 : column + 1;
    const neighborsStatus: Array<boolean> = [
      cellsStatus[topNeighborRow][leftNeighborColumn],
      cellsStatus[topNeighborRow][column],
      cellsStatus[topNeighborRow][rightNeighborColumn],
      cellsStatus[row][leftNeighborColumn],
      cellsStatus[row][rightNeighborColumn],
      cellsStatus[bottomNeighborRow][leftNeighborColumn],
      cellsStatus[bottomNeighborRow][column],
      cellsStatus[bottomNeighborRow][rightNeighborColumn],
    ];
    const liveNeighbors = neighborsStatus.filter(
      (neighborStatus) => neighborStatus
    );
    return liveNeighbors.length;
  };

  const updateCellStatus = (row: number, column: number) => {
    const liveNeighborsAmount = getLiveNeighborsAmount(row, column);
    const isLive = cellsStatus[row][column];
    if (isLive && (liveNeighborsAmount < 2 || liveNeighborsAmount > 3)) {
      //die
      setCellsStatus((prevCellsStatus) => {
        const newCellsStatus = JSON.parse(JSON.stringify(prevCellsStatus));
        newCellsStatus[row][column] = false;
        return newCellsStatus;
      });
    } else if (!isLive && liveNeighborsAmount === 3) {
      //come to life
      setCellsStatus((prevCellsStatus) => {
        const newCellsStatus = JSON.parse(JSON.stringify(prevCellsStatus));
        newCellsStatus[row][column] = true;
        return newCellsStatus;
      });
    }
  };

  const onNextGeneration = () => {
    [...Array(maxRow)].map((_, row) =>
      [...Array(maxColumn)].map((_, column) => updateCellStatus(row, column))
    );
  };

  const onReset = () => {
    setCellsStatus(initialCellsStatus);
  };

  return (
    <div aria-label="game board">
      {[...Array(maxRow)].map((_, row) => (
        <Row key={row}>
          {[...Array(maxColumn)].map((_, column) => (
            <Cell
              key={`${row}-${column}`}
              aria-label={`cell-${row}-${column}`}
              isLive={cellsStatus[row][column]}
              onClick={() => toggleCellStatus(row, column)}
            />
          ))}
        </Row>
      ))}
      <button onClick={onNextGeneration}>Next Generation</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

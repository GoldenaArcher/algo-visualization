import React, { useEffect, useState } from "react";
import UnionFind from "./uf";
import "./uf.css";
import _, { cloneDeep } from "lodash";

const UnionFindGraph = () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [board, setBoard] = useState(
    Array.from(Array(row * col), () => new Array(4).fill(false))
  );
  const [uf, setUf] = useState(new UnionFind());

  useEffect(() => {
    const newUf = cloneDeep(uf);
    board.forEach((_, i) => {
      newUf.makeSet(i);
    });
    console.log(newUf);
    setUf(newUf);
  }, []);

  const renderBoard = () => {
    return board.map(([up, down, left, right], i) => {
      const classNames = ["uf__cell"];
      if (!up) classNames.push("uf__cell-up");
      if (!down) classNames.push("uf__cell-down");
      if (!left) classNames.push("uf__cell-left");
      if (!right) classNames.push("uf__cell-right");

      return <div className={classNames.join(" ")} key={i}></div>;
    });
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  };

  const getAdjacentNode = (node) => {
    let left = null;

    if (node - 1 >= 0 && node % row !== 0) {
      left = node - 1;
    }

    let right = null;

    if (node + 1 < row * col && node % row !== row - 1) {
      right = node + 1;
    }
    const up = node - row < 0 ? null : node - row;
    const down = node + row >= row * col ? null : node + row;

    return [up, down, left, right];
  };

  const pickNode = () => {
    while (true) {
        console.log('picknode');
      const node = getRandomIntInclusive(0, row * col - 1),
        neightbors = getAdjacentNode(node);

      const i = getRandomIntInclusive(0, 4);

      const neighbor = neightbors[i];
      if (!neighbor) continue;

      if (uf.findSet(node) !== uf.findSet(neighbor)) {
        return [node, neighbor, i];
      }
    }
  };

  const removeNode = () => {
    if (uf.findSet(0) === uf.findSet(row * col - 1)) return;

    const [node, neighbor, i] = pickNode();

    console.log(node, neighbor, i);

    uf.union(node, neighbor);

    setBoard((prevState) => {
      const newBoard = _.cloneDeep(prevState);

      switch (i) {
        case 0:
          newBoard[node][0] = true;
          newBoard[neighbor][1] = true;
          break;
        case 1:
          newBoard[node][1] = true;
          newBoard[neighbor][0] = true;
          break;
        case 2:
          newBoard[node][2] = true;
          newBoard[neighbor][3] = true;
          break;
        case 3:
          newBoard[node][3] = true;
          newBoard[neighbor][2] = true;
          break;
        default:
          break;
      }

      return newBoard;
    });
  };

  return (
    <>
      <div
        className="uf__board"
        style={{
          gridTemplateColumns: `repeat(${row}, auto)`,
          width: `${row * 30}px`,
        }}
      >
        {renderBoard()}
      </div>
      <button onClick={removeNode}>Click</button>
    </>
  );
};

export default UnionFindGraph;

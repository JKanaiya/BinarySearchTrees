import { BinarySearchFactory } from "./BinarySearchFactory.js";

let testArr = [122, 1, 2, 3, 4, 5, 5, 6, 11, 11, 7, 8];

let test = BinarySearchFactory();

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(test.Tree(testArr));

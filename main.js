import { BinarySearchFactory } from "./BinarySearchFactory.js";
import { levelOrder } from "./levelOrder.js";
import { preOrder } from "./preOrder.js";
import { inOrder } from "./inOrder.js";
import { postOrder } from "./postOrder.js";

let testArr = [];

const genTestArr = function () {
  for (let i = 0; i < 20; i++) {
    testArr[i] = Math.floor(Math.random() * 100);
  }
};

const driverFunction = function () {
  let test = BinarySearchFactory();
  test.Tree(testArr);
  console.log("Is the Tree Balanced? " + test.isBalanced());
  console.log("Level-Order");
  console.log(levelOrder(test.Tree(testArr)));
  console.log("Pre-Order");
  console.log(preOrder(test.Tree(testArr)));
  console.log("In-Order");
  console.log(inOrder(test.Tree(testArr)));
  console.log("Post-Order");
  console.log(postOrder(test.Tree(testArr)));
  console.log("Adding values to the tree...");
  test.insertNode(120);
  test.insertNode(130);
  test.insertNode(180);
  test.insertNode(170);
  test.insertNode(160);
  test.insertNode(150);
  console.log("Is the Tree Balanced? " + test.isBalanced());
  console.log("Rebalance");
  test.reBalance();
  console.log("Is the Tree Balanced? " + test.isBalanced());
  console.log("Level-Order");
  console.log(levelOrder(test.Tree(testArr)));
  console.log("Pre-Order");
  console.log(preOrder(test.Tree(testArr)));
  console.log("In-Order");
  console.log(inOrder(test.Tree(testArr)));
  console.log("Post-Order");
  console.log(postOrder(test.Tree(testArr)));
};
genTestArr();
driverFunction();

const preOrder = function (temp) {
  let values = [];
  if (temp == null) {
    throw new Error("Invalid input, please validate your input");
  }
  function preIterate(node) {
    if (node.data) values.push(node.data);

    if (node.left) preIterate(node.left);

    if (node.right) preIterate(node.right);

    return;
  }
  preIterate(temp);
  return values;
};

export { preOrder };

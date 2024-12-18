const postOrder = function (temp) {
  let values = [];
  if (temp == null) {
    throw new Error("Invalid input, please validate your input");
  }
  function postIterate(node) {
    if (node.left) postIterate(node.left);

    if (node.right) postIterate(node.right);

    if (node.data) values.push(node.data);

    return;
  }
  postIterate(temp);
  return values;
};

export { postOrder };

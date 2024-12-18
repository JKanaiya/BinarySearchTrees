const inOrder = function (temp) {
  let values = [];
  function inIterate(node) {
    if (node.left) inIterate(node.left);

    if (node.data) values.push(node.data);

    if (node.right) inIterate(node.right);

    return;
  }
  inIterate(temp);
  return values;
};

export { inOrder };

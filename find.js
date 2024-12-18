const find = function (value, root) {
  let found = false;
  function findValue(node) {
    if (node.data == value) {
      found = node;
    }
    if (node.left) findValue(node.left);

    if (node.right) findValue(node.right);

    return;
  }
  findValue(root);
  return found;
};

export { find };

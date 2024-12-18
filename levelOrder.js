const levelOrder = function (toLevel) {
  let queue = [toLevel];
  let values = [];
  if (toLevel == null) {
    return null;
  }
  function levelIterate(node) {
    if (node.left) queue.push(node.left);

    if (node.right) queue.push(node.right);

    if (node.data) values.push(node.data);

    queue.shift();

    if (queue.length > 0) queue.forEach((node) => levelIterate(node));

    return values;
  }
  return levelIterate(toLevel);
};

export { levelOrder };

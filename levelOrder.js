const levelOrder = function (toLevel) {
  let queue = [toLevel];
  let values = [];
  function levelIterate(node) {
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    values.push(node.value);
    queue.shift();
    if (queue.length > 0) {
      queue.forEach((node) => levelIterate(node));
    } else return values;
  }
  return levelIterate(toLevel);
};

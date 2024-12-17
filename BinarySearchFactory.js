const BinarySearchFactory = function () {
  const nodeConstruct = function (data, left, right) {
    if (!left) left = null;
    if (!right) right = null;
    return {
      data,
      left,
      right,
    };
  };

  const Tree = function (temp) {
    let head = null;
    function buildTree(arr) {
      if (arr.length <= 1) {
        return nodeConstruct(arr[0]);
      }
      let mid = Math.round((arr.length - 1) / 2);
      if (head == null) {
        head = nodeConstruct(
          arr[mid],
          buildTree(arr.slice(0, mid)),
          buildTree(arr.slice(mid + 1))
        );
      }
      return nodeConstruct(
        arr[mid],
        buildTree(arr.slice(0, mid)),
        buildTree(arr.slice(mid + 1))
      );
    }
    temp = prepareArray(temp);
    buildTree(temp);
    return head;
  };

  const prepareArray = function (arr) {
    arr.sort(function (a, b) {
      return a - b;
    });
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] == arr[i + 1]) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  return {
    prepareArray,
    Tree,
  };
};

export { BinarySearchFactory };

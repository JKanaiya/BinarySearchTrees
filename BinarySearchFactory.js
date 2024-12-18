const BinarySearchFactory = function () {
  const nodeConstruct = function (data, left, right) {
    if (!left) left = null;
    if (!right) right = null;
    if (!data) {
      return null;
    }
    return {
      data,
      left,
      right,
    };
  };

  let root = null;
  const Tree = function (temp) {
    function buildTree(arr) {
      if (arr.length <= 1) {
        return nodeConstruct(arr[0]);
      }
      let mid = Math.round((arr.length - 1) / 2);
      if (root == null) {
        root = nodeConstruct(
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
    return root;
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

  const insertNode = function (value) {
    let done = false;
    function insertValue(node) {
      if (node.left && value < node.data) insertValue(node.left);
      else if (!node.left && value < node.data) {
        node.left = nodeConstruct(value);
        done = true;
        return;
      } else if (node.right) insertValue(node.right);
      else if (!node.right) {
        node.right = nodeConstruct(value);
        done = true;
        return;
      }
      return;
    }
    insertValue(root);
    return done;
  };

  const deleteNode = function (value) {
    if (root.data == value) {
      rootReplace();
      return;
    }

    let direction = null;
    let parent = null;

    const childlessRemove = function () {
      parent[direction] = null;
    };
    const singleChildRemove = function () {
      if (parent[direction].left) parent[direction] = parent[direction].left;
      if (parent[direction].right) parent[direction] = parent[direction].right;
    };

    const multiChildRemove = function () {
      let point = parent[direction].right;
      function replacement(node) {
        if (node.left) {
          if (node.left.left) replacement(node.left);
          node.left.right = point;

          node.left.left = parent[direction].left;

          parent[direction] = node.left;

          point.left = null;

          if (node.left.right) node.left = node.left.right;
          else node.left = null;
        } else {
        }
        point.left = parent[direction].left;

        parent[direction] = point;
      }
      replacement(point);
    };

    const findValue = function (node) {
      if (node.left) {
        if (node.left.data == value) {
          parent = node;
          direction = "left";
          return;
        }
      }
      if (node.right) {
        if (node.right.data == value) {
          parent = node;
          direction = "right";
          return;
        }
      }
      if (node.left) findValue(node.left);

      if (node.right) findValue(node.right);
    };

    findValue(root);

    console.log(parent);
    if (parent[direction]) {
      if (parent[direction].left && parent[direction].right) {
        multiChildRemove();
        return "success";
      }

      if (
        (!parent[direction].left && parent[direction].right) ||
        (!parent[direction].right && parent[direction].left)
      ) {
        singleChildRemove();
        return "success";
      }
      if (!parent[direction].left && !parent[direction].right)
        childlessRemove();
      return "success";
    }
  };

  const rootReplace = function () {
    const multiChildRootReplacement = function (node) {
      // why why why, should i need to account for nonsensical situations
      if (node.left.left) multiChildRootReplacement(node.left);
      node.left.left = root.left;
      if (node.left.right) {
        node.left = node.left.right;
      }
      node.left.right = root.right;
      node.left.right.left.left = null;
      root = node.left;
      node.left = null;
    };
    const singleChildRootReplacement = function (node) {
      root = node;
    };
    if (!root.right.left || !root.right.right) root = root.right;
    else if (!root.left) {
      singleChildRootReplacement(root.right);
    } else if (!root.right) {
      singleChildRootReplacement(root.left);
    } else {
      multiChildRootReplacement(root.right);
    }
  };

  const find = function (value) {
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

  return {
    prepareArray,
    Tree,
    find,
    insertNode,
    deleteNode,
  };
};

export { BinarySearchFactory };

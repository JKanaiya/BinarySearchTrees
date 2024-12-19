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
    let done = false;
    const multiChildRootReplacement = function (node) {
      // why why why, should i need to account for nonsensical situations
      if (node.left.left) multiChildRootReplacement(node.left);
      if (done) {
        return;
      }
      let temp = node.left;
      if (temp.right) {
        node.left = temp.right;
      } else node.left = null;

      temp.left = root.left;
      temp.right = root.right;

      root = temp;
      done = true;
      return;
    };
    const singleChildRootReplacement = function (node) {
      root = node;
    };
    if (!root.right.left || !root.right.right) {
      root.right.left = root.left;
      root = root.right;
    } else if (!root.left) {
      singleChildRootReplacement(root.right);
    } else if (!root.right) {
      singleChildRootReplacement(root.left);
    } else {
      multiChildRootReplacement(root.right);
    }
  };

  const max = function (a, b) {
    if (a > b) return a;
    else return b;
  };

  const depth = function (value) {
    const findDepth = function (node) {
      if (!node) return false;
      if (value === node.data) return 0;
      if (value < node.data) return findDepth(node.left) + 1;
      else return findDepth(node.right) + 1;
    };
    return findDepth(root);
  };

  const height = function (value) {
    let r = null;
    const findHeight = function (node) {
      if (!node) return;
      if (value === node.data) {
        const getToLeaf = function (node) {
          if (!node) return -1;
          return max(getToLeaf(node.left), getToLeaf(node.right)) + 1;
        };
        r = getToLeaf(node);
      } else {
        if (value < node.data) findHeight(node.left) + 1;
        else findHeight(node.right) + 1;
      }
    };
    findHeight(root);
    return r;
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
    depth,
    height,
  };
};

export { BinarySearchFactory };

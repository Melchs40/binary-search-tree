class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length < 1) return null;

    let newArr = mergeSort(array);
    let mid = Math.floor(newArr.length / 2);
    let root = new Node(newArr[mid]);
    root.left = this.buildTree(newArr.slice(0, mid));
    root.right = this.buildTree(newArr.slice(mid + 1));

    return root;

    function mergeSort(array) {
      if (array.length <= 1) {
        return array;
      } else {
        let mid = array.length / 2;
        let left = mergeSort(array.slice(0, mid));
        let right = mergeSort(array.slice(mid));

        let mergedList = merge(left, right);
        return removeDupe(mergedList);
      }
    }

    function merge(left, right) {
      let temp = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          temp.push(left[i]);
          i++;
        } else {
          temp.push(right[j]);
          j++;
        }
      }
      temp.push(...left.slice(i));
      temp.push(...right.slice(j));
      return temp;
    }

    function removeDupe(array) {
      for (let i = 0; i < array.length - 1; i++) {
        while (array[i] == array[i + 1]) {
          array.splice(i + 1, 1);
        }
      }
      return array;
    }
  }

  insert(value) {
    let node = this.root;

    if (node === null) {
      this.root = new Node(value);
      return 'No node existed, this is now the root node';
    }

    while (node) {
      if (value === node.data) {
        return 'This value is already on the tree';
      }
      if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value);
          return 'Inserted a new left node';
        }
        node = node.left;
        console.log('Moving down tree from left side');
      } else {
        // value > node.data
        if (node.right === null) {
          node.right = new Node(value);
          return 'Inserted a new right node';
        }
        node = node.right;
        console.log('Moving down tree from right side');
      }
    }
  }

  deleteItem(value, node = this.root) {
    if (node == null) {
      return 'There is no binary tree';
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
      return node;
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
      return node;
    }

    if (node.left == null) {
      let temp = node.right;
      return temp;
    } else if (node.right == null) {
      let temp = node.left;
      return temp;
    } else {
      let parent = node;
      let newNode = node.right;
      while (newNode.left !== null) {
        parent = newNode;
        newNode = newNode.left;
      }

      if (parent !== node) {
        parent.left = newNode.right;
      } else {
        parent.right = newNode.right;
      }

      node.data = newNode.data;
      return node;
    }
  }

  findVal(value) {
    let node = this.root;
    if (node == null) {
      return 'There is no binary tree';
    }

    while (node) {
      if (value < node.data) {
        if (node.left == null) {
          return 'Value is not on this tree';
        } else node = node.left;
      } else if (value > node.data) {
        if (node.right == null) {
          return 'Value is not on this tree';
        } else node = node.right;
      } else return node;
    }
  }

  levelOrder(callback) {
    let node = this.root;
    let nodeArray = [];
    let printArray = [];
    if (node == null) {
      return 'There is no binary tree';
    }

    nodeArray.push(node);

    while (nodeArray.length > 0) {
      let currentNode = nodeArray.shift();
      if (currentNode.left !== null) {
        nodeArray.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        nodeArray.push(currentNode.right);
      }
      printArray.push(currentNode.data);
    }

    if (callback == null) {
      return printArray;
    } else callback(printArray);
  }

  inOrder(callback, node = this.root, array = []) {
    if (this.root == null) {
      return 'There is no binary tree';
    }
    if (node == null) {
      return node;
    }

    this.inOrder(null, node.left, array);

    array.push(node.data);

    this.inOrder(null, node.right, array);

    if (callback == null) {
      return array;
    } else callback(array);
  }

  preOrder(callback, node = this.root, array = []) {
    if (this.root == null) {
      return 'There is no binary tree';
    }

    if (node == null) {
      return node;
    }

    array.push(node.data);

    this.preOrder(null, node.left, array);

    this.preOrder(null, node.right, array);

    if (callback == null) {
      return array;
    } else callback(array);
  }

  //   preOrder(callback, node = this.root, array = []) {
  //     if (node == null) {
  //       return 'There is no binary tree';
  //     }

  //     array.push(node.data);

  //     if (node.left == null && node.right == null) {
  //       return node;
  //     }
  //     if (node.left !== null) {
  //       this.inOrder(null, node.left, array);
  //     }

  //     if (node.right !== null) {
  //       this.inOrder(null, node.right, array);
  //     }

  //     if (callback == null) {
  //       return array;
  //     } else callback(array);
  //   }

  postOrder(callback, node = this.root, array = []) {
    if (this.root == null) {
      return 'There is no binary tree';
    }
    if (node == null) {
      return node;
    }

    this.postOrder(null, node.left, array);

    this.postOrder(null, node.right, array);

    array.push(node.data);

    if (callback == null) {
      return array;
    } else callback(array);
  }

  // height(value) {
  //   let node = this.root;
  //   let newNode = '';
  //   let tempHeight = 0;
  //   let height = 0;

  //   if (node == null) {
  //     return 'There is no binary tree';
  //   }

  //   while (node) {
  //     if (value == node.data) {
  //       newNode = node;
  //       while (newNode) {
  //         if (newNode.left == null && newNode.right == null) {
  //           tempHeight++;
  //           if (tempHeight > height) {
  //             height = tempHeight;
  //             tempHeight = 0;
  //           }
  //           return height;
  //         }

  //         if (newNode.left !== null) {
  //           tempHeight++;
  //           newNode = newNode.left;
  //         }

  //         if (newNode.right !== null) {
  //           tempHeight++;
  //           newNode = newNode.right;
  //         }
  //       }
  //     }

  //     if (value < node.data) {
  //       if (node.left == null) {
  //         return `The value ${value} is not in this binary tree`;
  //       } else node = node.left;
  //     }

  //     if (value > node.data) {
  //       if (node.right == null) {
  //         return `The value ${value} is not in this binary tree`;
  //       } else node = node.right;
  //     }
  //   }
  // }

  height(value) {
    let node = this.root;

    if (node == null) {
      return 'There is no binary tree';
    }

    while (node) {
      if (value == node.data) {
        break;
      } else if (value < node.data) {
        if (node.left == null) {
          return `The value ${value} is not in this binary tree`;
        } else node = node.left;
      } else {
        if (node.right == null) {
          return `The value ${value} is not in this binary tree`;
        } else node = node.right;
      }
    }

    function findHeight(node) {
      if (node == null) {
        return 0;
      }

      const leftHeight = findHeight(node.left);
      const rightHeight = findHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return findHeight(node);
  }

  depth(value) {
    let node = this.root;
    let depth = 0;

    if (node == null) {
      return 'There is no binary tree';
    }

    while (node) {
      if (value == node.data) {
        depth++;
        return depth;
      }

      if (value < node.data) {
        if (node.left == null) {
          return `The value ${value} is not in this binary tree`;
        } else depth++;
        node = node.left;
      }

      if (value > node.data) {
        if (node.right == null) {
          return `The value ${value} is not in this binary tree`;
        } else depth++;
        node = node.right;
      }
    }
  }

  // isBalanced(node = this.root) {
  //   if (node == null) {
  //     return 'There is no binary tree';
  //   }

  //   function findHeight(node) {
  //     if (node == null) {
  //       return 0;
  //     }

  //     const leftHeight = findHeight(node.left);
  //     const rightHeight = findHeight(node.right);

  //     return Math.max(leftHeight, rightHeight) + 1;
  //   }

  //   function balancing(node = this.root) {
  //     const leftHeight = findHeight(node.left);
  //     const rightHeight = findHeight(node.right);
  //     const heightDiff = Math.abs(leftHeight - rightHeight);
  //     if (heightDiff > 1) {
  //       return false;
  //     }
  //     return balancing(node.left) && balancing(node.right);
  //   }

  //   return balancing((node = this.root));
  // }

  isBalanced(currentNode = this.root) {
    if (currentNode === null) {
      return 'There is no binary tree';
    }

    function findHeight(node) {
      if (node == null) {
        return 0;
      }

      const leftHeight = findHeight(node.left);
      const rightHeight = findHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }

    const heightDiff = Math.abs(
      findHeight(currentNode.left) - findHeight(currentNode.right)
    );
    if (heightDiff > 1) {
      return 'This tree is not balanced';
    } else {
      return 'This tree is balanced';
    }
  }

  rebalance() {
    let newArr = this.inOrder();
    this.root = this.buildTree(newArr);
  }
}

let testArray = [];

while (testArray.length < 25) {
  let number = Math.random() * 100 + 1;
  number = Math.floor(number);
  testArray.push(number);
}

let tree = new Tree(testArray);
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
tree.insert(110);
tree.insert(111);
tree.insert(130);
tree.insert(150);
tree.insert(200);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

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
}

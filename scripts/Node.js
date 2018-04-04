class Node {
  constructor(word = null) {
    this.word = word;
    this.isWord = false;
    this.children = {};
  }
}

module.exports = Node;


// node takes in a word as a value

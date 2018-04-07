class Node {
  constructor(word = null) {
    this.word = word;
    this.isWord = false;
    this.popularity = 0;
    this.children = {};
  }
}

module.exports = Node;
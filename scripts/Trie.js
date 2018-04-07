const Node = require('../scripts/Node');

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  insert(word) {
    const letters = [...word.toLowerCase()];
    let currentNode = this.root;

    letters.forEach((letter) => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }

      currentNode = currentNode.children[letter];
    });

    if (!currentNode.isWord) {
      this.wordCount += 1;
      currentNode.isWord = true;
    }
  }

  suggest(word) {
    let currentNode = this.root;
    const suggestedWords = [];

    currentNode = this.findWord(word);

    const retrieveWord = (string, currentNode) => {
      if (currentNode.isWord) {
        const suggestedWord = {
          name: string,
          popularity: currentNode.popularity,
        };

        suggestedWords.push(suggestedWord);
      }

      if (currentNode.children) {
        const childKeys = Object.keys(currentNode.children);
        childKeys.forEach((child) => {
          const childNode = currentNode.children[child];
          const newString = string + child;

          retrieveWord(newString, childNode);
        });
      }
    };

    retrieveWord(word, currentNode);

    const sortedSuggestions = suggestedWords.sort((a, b) => b.popularity - a.popularity)
      .map(suggestion => suggestion.name);

    return sortedSuggestions;
  }

  select(word) {
    const currentNode = this.findWord(word);
    currentNode.popularity += 1;
    return currentNode;
  }

  findWord(word) {
    const letters = [...word.toLowerCase()];
    let currentNode = this.root;

    for (let i = 0; i < letters.length; i += 1) {
      if (currentNode.children[letters[i]]) {
        currentNode = currentNode.children[letters[i]];
      } else {
        return [];
      }
    }

    return currentNode;
  }

  populate(array) {
    array.forEach((element) => {
      this.insert(element);
    });
  }
}

module.exports = Trie;

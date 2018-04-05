const Node = require('../scripts/Node');

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  insert(word) {
    const letters = [...word.toLowerCase()];
    let currentNode = this.root;
  
    letters.forEach(letter => {
      if(!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }

      currentNode = currentNode.children[letter];
    })

    if (!currentNode.isWord) {
      this.wordCount++;
      currentNode.isWord = true;
    } 
  }

  suggest(word) {
    let currentNode = this.root;
    const letters = [...word.toLowerCase()];
    let suggestedWords = [];

    for(let i = 0; i < letters.length; i++) {
        if(currentNode.children[letters[i]]) {
          currentNode = currentNode.children[letters[i]];
        } else {
            return [];
        }
    }

    let retrieveWord = (word, currentNode) => {
      if (currentNode.isWord) {
        suggestedWords.push(word);
      }

      if (currentNode.children) {
        let childKeys = Object.keys(currentNode.children);
        childKeys.forEach(child => {
          let childNode = currentNode.children[child];
          let newString = word + child;

          retrieveWord(newString, childNode)
        })
      }
    }

    retrieveWord(word, currentNode);

    return suggestedWords;
  }

  populate(array) {
    array.forEach(element => {
      this.insert(element);
    })
  }
}

module.exports = Trie;
const { expect } = require('chai');
const Trie = require('../scripts/Trie');

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('trie should exist', function() {
    expect(trie).to.exist;
  });

  it('should start with a word count of zero', function() {
    expect(trie.wordCount, 0)
  })

  describe('INSERT', () => {
    // it('should force the string taken in as an argument to lower case', function() {
    //   let word = 'Hairball';
    //   trie.insert(word);

    //   expect(lowercaseWord, 'hairball')
    // })

    it('should insert a node into the trie', function() {
      trie.insert('von');
      expect(trie.root.children.v.word, 'v')
    })

    it('should define the end of a word', function() {
      trie.insert('meow');
      expect(trie.root.children.m.children.e.children.o.children.w.isWord, true)
    })

    it('should increase the word count when a word is inserted', function() {
      trie.insert('catnip');
      expect(trie.wordCount, 1);
    })

    it('should not increase the word count when duplicate words are inserted', function() {
      trie.insert('furry');
      trie.insert('plotting');
      trie.insert('furry');
      expect(trie.wordCount, 2);
    })

    it('should add addition children to the last node of a prefix to words with the same prefix', function() {
      trie.insert('paws');
      trie.insert('pant');
      expect(Object.keys(trie.root.children.p.children.a.children).length, 2);
    })

  describe('SUGGEST', () => {

    it('should be a function', function() {
      expect(trie.suggest).to.exist;
    })

    it('should return an empty array if the word is not in the trie', function() {
      trie.insert('pie');
      trie.insert('pizza');
      trie.insert('pickles');
      trie.insert('pineapple');
      trie.insert('poodle');

      let suggest = trie.suggest('p');
      console.log(suggest)

      expect(suggest).to.deep.equal(['pie', 'pizza', 'pickles', 'pineapple', 'poodle']);
    })
  })



  })
})
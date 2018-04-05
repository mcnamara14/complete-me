const { expect } = require('chai');
require('locus')
const Trie = require('../scripts/Trie');
const fs = require('fs');
const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('trie should exist', function() {
    expect(trie).to.exist;
  });

  it('should start with a word count of zero', function() {
    expect(trie.wordCount).to.equal(0);
  })

  describe('INSERT', () => {
    it('should force the string taken in as an argument to lower case', function() {
      trie.insert('HAIRBALL');

      expect(trie.root.children.h.word).to.equal('h');
      expect(trie.root.children.h.children.a.word).to.equal('a');
    })

    it('should insert a node into the trie', function() {
      trie.insert('von');

      expect(trie.root.children.v.word).to.equal('v');
    })

    it('should define the end of a word', function() {
      trie.insert('meow');

      expect(trie.root.children.m.children.e.children.o.children.w.isWord).to.equal(true);
    })

    it('should increase the word count when a word is inserted', function() {
      trie.insert('catnip');

      expect(trie.wordCount).to.equal(1);
    })

    it('should not increase the word count when duplicate words are inserted', function() {
      trie.insert('furry');
      trie.insert('plotting');
      trie.insert('furry');

      expect(trie.wordCount).to.equal(2);
    })

    it('should have additional children with the same node is used', function() {
      trie.insert('paws');
      trie.insert('pant');

      expect(Object.keys(trie.root.children.p.children.a.children).length).to.equal(2);
    })
  })

  describe('SUGGEST', () => {

    it('should be a function', function() {
      expect(trie.suggest).to.exist;
    })

    it('should return an empty array if the root doesn\'t have a child node equal to the first inserted letter', function() {
      trie.insert('pie');

      const suggest = trie.suggest('dinger');

      expect(suggest).to.deep.equal([]);
    })

    it('should return an empty array if the entire suggested word isn\'t in the trie', function() {
      trie.insert('carpool');

      const suggest = trie.suggest('cat');

      expect(suggest).to.deep.equal([]);
    })

    it('should return an array of suggested words', function() {
      trie.insert('pie');
      trie.insert('pizza');
      trie.insert('pickles');
      trie.insert('pineapple');
      trie.insert('poodle');

      const suggest = trie.suggest('p');

      expect(suggest).to.deep.equal(['pie', 'pizza', 'pickles', 'pineapple', 'poodle']);
    })
  })

  describe('POPULATE', () => {

    it('should populate the trie with all the words in the dictionary', function() {
      trie.populate(dictionary);

      expect(trie.wordCount).to.equal(234371);
    })

  })
})
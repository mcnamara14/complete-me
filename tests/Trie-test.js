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
  });

  describe('INSERT', () => {
    it('should force the string taken in as an argument to lower case', function() {
      trie.insert('HAIRBALL');

      expect(trie.root.children.h.word).to.equal('h');
      expect(trie.root.children.h.children.a.word).to.equal('a');
    });

    it('should insert a node into the trie', function() {
      trie.insert('von');

      expect(trie.root.children.v.word).to.equal('v');
    });

    it('should define the end of a word', function() {
      trie.insert('meow');

      expect(trie.root.children.m.children.e.children.o.children.w.isWord).to.equal(true);
    });

    it('should increase the word count when a word is inserted', function() {
      trie.insert('catnip');

      expect(trie.wordCount).to.equal(1);
    });

    it('should not increase the word count when duplicate words are inserted', function() {
      trie.insert('furry');
      trie.insert('plotting');
      trie.insert('furry');

      expect(trie.wordCount).to.equal(2);
    });

    it('should have additional children when two nodes share a parent', function() {
      trie.insert('paws');
      trie.insert('pant');

      expect(Object.keys(trie.root.children.p.children.a.children).length).to.equal(2);
    });
  });

  describe('SUGGEST', () => {

    it('should be a function', function() {
      expect(trie.suggest).to.exist;
    });

    it('should return an empty array if the root doesn\'t have a child node equal to the first inserted letter', function() {
      trie.insert('pie');

      const suggest = trie.suggest('dinger');

      expect(suggest).to.deep.equal([]);
    });

    it('should return an empty array if the entire suggested word isn\'t in the trie', function() {
      trie.insert('carpool');

      const suggest = trie.suggest('cat');

      expect(suggest).to.deep.equal([]);
    });

    it('should return an array of suggested words', function() {
      trie.insert('pie');
      trie.insert('pizza');
      trie.insert('pickles');
      trie.insert('pineapple');
      trie.insert('poodle');

      const suggest = trie.suggest('p');

      expect(suggest).to.deep.equal(['pie', 'pizza', 'pickles', 'pineapple', 'poodle']);
    });

    it('should order the suggested words by popularity', function() {
      trie.insert('cute');
      trie.insert('cunning');
      trie.insert('calculating');
      trie.insert('calico');
      trie.select('cunning');
      trie.select('cunning');
      trie.select('cunning');
      trie.select('calculating');

      const suggest = trie.suggest('c')

      expect(suggest).to.deep.equal(['cunning', 'calculating', 'cute', 'calico']);
    });
  });

  describe('POPULATE', () => {

    it('should populate the trie with all the words in the dictionary', function() {
      trie.populate(dictionary);

      expect(trie.wordCount).to.equal(234371);
    });

  describe('FIND WORD', () => {

    it('should return last node of a word', function() {
      trie.insert('cat')

      const lastNode = trie.findWord('cat');

      expect(lastNode.word).to.equal('t');
    });
  });

  describe('SELECT', () => {

    it('should increase popularity of selected word by one each time it\'s selected', function() {
      trie.insert('crazy');
      trie.select('crazy');
      trie.select('crazy');
      trie.select('crazy');

      expect(trie.root.children.c.children.r.children.a.children.z.children.y.popularity).to.equal(3);
    });
  });

  });
})
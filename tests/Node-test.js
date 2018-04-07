const { expect } = require('chai');
const Node = require('../scripts/Node');

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node()
  })

  it('should be a thing', () => {
    expect(node).to.exist;
  })

  it('should have the word property start as null by default', function() {
    expect(node.word).to.equal(null);
  })

  it('should start out as not a word', function() {
    expect(node.isWord).to.equal(false);
  })

  it('should start with a popularity of zero', function() {
    expect(node.popularity).to.equal(0);
  })

  it('should start with an empty object as its children property', function() {
    expect(node.children).to.deep.equal({});
  })

})
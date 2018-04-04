const { expect } = require('chai');
const Node = require('../scripts/Node');

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node('von')
  })

  it.skip('should be a thing', () => {
    expect(node).to.exist
  })

})
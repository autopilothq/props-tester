var PropsValidator = require('../lib');
var expect         = require('chai').expect;

describe('Constructor', function() {
  it('Throws an error if describe param is not provided', function() {
    expect(function() {
      new PropsValidator();
    }).to.throw('<describe> function should be provided.');
  });

  it('Throws an error if <it> function is not provided', function() {
    expect(function() {
      new PropsValidator(describe);
    }).to.throw('<it> function should be provided.');
  });

  it('Throws an error if <describe> is not a function', function() {
    expect(function() {
      new PropsValidator('describe', it);
    }).to.throw('<describe> should be a function.');
  });

  it('Throws an error if <it> is not a function', function() {
    expect(function() {
      new PropsValidator(describe, 'it');
    }).to.throw('<it> should be a function.');
  });

  it('Does not throw when both describe and it are function', function() {
    expect(function(){
      new PropsValidator(describe, it);
    }).to.not.throw();
  });
});

'use strict';

const map = require('../');
const assert = require('assert');

describe('mapWithLookaround', function() {
  it('allows mapping values of a generator', function() {
    function* generator() {
      for (let i = 10; i < 20; i++)
        yield i;
    }

    const mapped = map(generator(), (element, behind, ahead) => {
      return { element, behind: behind.slice(), ahead: ahead.slice() };
    }, 2, 4);

    assert.deepStrictEqual(Array.from(mapped), [
      {"element":10,"behind":[],"ahead":[11,12,13,14]},
      {"element":11,"behind":[10],"ahead":[12,13,14,15]},
      {"element":12,"behind":[10,11],"ahead":[13,14,15,16]},
      {"element":13,"behind":[11,12],"ahead":[14,15,16,17]},
      {"element":14,"behind":[12,13],"ahead":[15,16,17,18]},
      {"element":15,"behind":[13,14],"ahead":[16,17,18,19]},
      {"element":16,"behind":[14,15],"ahead":[17,18,19]},
      {"element":17,"behind":[15,16],"ahead":[18,19]},
      {"element":18,"behind":[16,17],"ahead":[19]},
      {"element":19,"behind":[17,18],"ahead":[]}
    ]);
  });

  it('defaults to one element of context', function() {
    function* generator() {
      for (let i = 10; i < 20; i++)
        yield i;
    }

    const mapped = map(generator(), (element, behind, ahead) => {
      return { element, behind: behind.slice(), ahead: ahead.slice() };
    });

    assert.deepStrictEqual(Array.from(mapped), [
      {"element":10,"behind":[],"ahead":[11]},
      {"element":11,"behind":[10],"ahead":[12]},
      {"element":12,"behind":[11],"ahead":[13]},
      {"element":13,"behind":[12],"ahead":[14]},
      {"element":14,"behind":[13],"ahead":[15]},
      {"element":15,"behind":[14],"ahead":[16]},
      {"element":16,"behind":[15],"ahead":[17]},
      {"element":17,"behind":[16],"ahead":[18]},
      {"element":18,"behind":[17],"ahead":[19]},
      {"element":19,"behind":[18],"ahead":[]}
    ]);
  });
});

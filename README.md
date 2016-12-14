map-with-lookaround
==============

[![NPM Version](https://img.shields.io/npm/v/map-with-lookaround.svg?style=flat)](https://npmjs.org/package/map-with-lookaround)
[![NPM Downloads](https://img.shields.io/npm/dm/map-with-lookaround.svg?style=flat)](https://npmjs.org/package/map-with-lookaround)
[![Build Status](https://travis-ci.org/addaleax/map-with-lookaround.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/map-with-lookaround?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/map-with-lookaround/badge.svg?branch=master)](https://coveralls.io/r/addaleax/map-with-lookaround?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/map-with-lookaround.svg?style=flat)](https://david-dm.org/addaleax/map-with-lookaround)

Map over an ES6 iterator, with both lookbehind and lookahead context.

Install:
`npm install map-with-lookaround`

```js
const map = require('map-with-lookaround');

function* generator() {
  for (let i = 10; i < 20; i++)
    yield i;
}

const mapped = map(generator(), (element, behind, ahead) => {
  console.log({ element, behind, ahead });
  return 2 * element;
}, 2, 4);

// Returns another generator, so:
console.log([...mapped]);

// prints:
{ element: 10, behind: [], ahead: [ 11, 12, 13, 14 ] }
{ element: 11, behind: [ 10 ], ahead: [ 12, 13, 14, 15 ] }
{ element: 12, behind: [ 10, 11 ], ahead: [ 13, 14, 15, 16 ] }
{ element: 13, behind: [ 11, 12 ], ahead: [ 14, 15, 16, 17 ] }
{ element: 14, behind: [ 12, 13 ], ahead: [ 15, 16, 17, 18 ] }
{ element: 15, behind: [ 13, 14 ], ahead: [ 16, 17, 18, 19 ] }
{ element: 16, behind: [ 14, 15 ], ahead: [ 17, 18, 19 ] }
{ element: 17, behind: [ 15, 16 ], ahead: [ 18, 19 ] }
{ element: 18, behind: [ 16, 17 ], ahead: [ 19 ] }
{ element: 19, behind: [ 17, 18 ], ahead: [] }
[ 20, 22, 24, 26, 28, 30, 32, 34, 36, 38 ]
```

License
=======

MIT

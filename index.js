'use strict';

function* MapWithLookaround(it, map, lookbehind=1, lookahead=1) {
  const behind = [], ahead = [];

  let done = false;

  while (!done || ahead.length > 0) {
    if (!done) {
      const n = it.next();
      if (n.done)
        done = true;
      else
        ahead.push(n.value);
    }

    if (ahead.length > 0 && (done || ahead.length > lookahead)) {
      const cur = ahead.shift();
      yield map(cur, behind, ahead);
      behind.push(cur);

      if (behind.length > lookbehind)
        behind.shift();
    }
  }
}

module.exports = MapWithLookaround;

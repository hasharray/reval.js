var assert = require('assert');
var revaluate = require('..');

var result = [];
for (var i = 0; i < 10; i++) {
  var fn = revaluate([
    'function fn() {}',
    'fn',
  ].join('\n'), __filename, function(output) {
    return eval(output.toString());
  });

  result.push(fn);
}

for (var i = 0; i < result.length; i++) {
  for (var j = 0; j < result.length; j++) {
    assert.strictEqual(result[i], result[j]);
  }
}

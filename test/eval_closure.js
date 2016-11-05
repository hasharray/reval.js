var assert = require('assert');
var revaluate = require('..');

var name = Date.now().toString(36) + '.js';

for (var i = 0; i < 10; i++) {
  var fn = revaluate([
    'var value = ' + i + ';',
    '(function() {',
    '  return value;',
    '})',
  ].join('\n'), name, function(output) {
    return eval(output.toString());
  });

  assert.equal(fn(), i);
}

for (var i = 0; i < 10; i++) {
  var fn = revaluate([
    'var value' + i + ' = 0;',
    '(function() {',
    '  return value' + i + ';',
    '})',
  ].join('\n'), name, function(output) {
    return eval(output.toString());
  });

  assert.equal(fn(), 0);
}

for (var i = 0; i < 10; i++) {
  var fn = revaluate([
    'var value' + i + ' = -1;',
    '(function() {',
    '  var value' + i + ' = 0;',
    '  return function() {',
    '    return value' + i + ';',
    '  }',
    '})',
  ].join('\n'), name, function(output) {
    return eval(output.toString());
  });

  assert.equal(fn()(), 0);
}

var result = [];
for (var i = 0; i < 10; i++) {
  var fn = revaluate([
    '(function() {',
    '  return value;',
    '})',
  ].join('\n'), name, function(output) {
    return eval(output.toString());
  });

  result.push(fn);
}

revaluate([
  'var value = 0;',
  '(function() {',
  '  return value;',
   '})',
].join('\n'), name, function(output) {
  return eval(output.toString());
});

for (var i = 0; i < result.length; i++) {
  var fn = result[i];
  assert.equal(fn(), 0);
}
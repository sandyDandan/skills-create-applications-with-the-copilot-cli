const test = require('node:test');
const assert = require('assert');
const { add, subtract, multiply, divide } = require('../src/calculator.js');

test('add 2 + 3 = 5', () => {
  assert.strictEqual(add(2, 3), 5);
});

test('subtract 5 - 2 = 3', () => {
  assert.strictEqual(subtract(5, 2), 3);
});

test('multiply 4 * 2 = 8', () => {
  assert.strictEqual(multiply(4, 2), 8);
});

test('divide 5 / 2 = 2.5', () => {
  assert.strictEqual(divide(5, 2), 2.5);
});

test('divide by zero throws', () => {
  assert.throws(() => divide(5, 0), /Division by zero|division by zero/);
});

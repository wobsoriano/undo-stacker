import { test } from 'uvu';
import * as assert from 'uvu/assert';
import createStack from '../src/index';

test('returns the first/last value if stack is in initial state', () => {
	const value = { x: 1 };
	const stack = createStack(value);

	assert.is(stack.undo(), value);
	assert.is(stack.redo(), value);
});

test('goes back and forward through history state', () => {
	const stack = createStack({ x: 1 });
	stack.push({ x: 2 });
	stack.push({ x: 3 });
	stack.push((value) => ({ x: value.x + 1 }));

	assert.equal(stack.undo(), { x: 3 });
	assert.equal(stack.undo(), { x: 2 });
	assert.equal(stack.undo(), { x: 1 });
	assert.equal(stack.redo(), { x: 2 });
	assert.equal(stack.redo(), { x: 3 });
	assert.equal(stack.redo(), { x: 4 });
});

test('clears later values when pushing', () => {
	const stack = createStack({ x: 1 });
	stack.push({ x: 2 });
	stack.push({ x: 3 });

	assert.equal(stack.undo(), { x: 2 });
	stack.push({ x: 4 });

	assert.equal(stack.undo(), { x: 2 });
	assert.equal(stack.undo(), { x: 1 });
	assert.equal(stack.redo(), { x: 2 });
	assert.equal(stack.redo(), { x: 4 });
});

test.run();
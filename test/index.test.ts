import { expect, test } from 'vitest';
import createStack from '../src';

test('returns the first/last value if stack is in initial state', () => {
	const value = { x: 1 };
	const stack = createStack(value);

	expect(stack.undo()).toMatchObject(value);
	expect(stack.redo()).toMatchObject(value);
});

test('goes back and forward through history state', () => {
	const stack = createStack({ x: 1 });
	stack.push({ x: 2 });
	stack.push({ x: 3 });
	stack.push((value) => ({ x: value.x + 1 }));

	expect(stack.undo()).toMatchObject({ x: 3 });
	expect(stack.undo()).toMatchObject({ x: 2 });
	expect(stack.undo()).toMatchObject({ x: 1 });
	expect(stack.redo()).toMatchObject({ x: 2 });
	expect(stack.redo()).toMatchObject({ x: 3 });
	expect(stack.redo()).toMatchObject({ x: 4 });
});

test('clears later values when pushing', () => {
	const stack = createStack({ x: 1 });
	stack.push({ x: 2 });
	stack.push({ x: 3 });

	expect(stack.undo()).toMatchObject({ x: 2 });
	stack.push({ x: 4 });

	expect(stack.undo()).toMatchObject({ x: 2 });
	expect(stack.undo()).toMatchObject({ x: 1 });
	expect(stack.redo()).toMatchObject({ x: 2 });
	expect(stack.redo()).toMatchObject({ x: 4 });
});

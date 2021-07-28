export default function createStack<T>(current: T) {
	const stack = [current];

	let index = stack.length;

  // @ts-ignore
	let state = {
		first: true,
		last: true,
		current
	};

	function update() {
		current = stack[index - 1];

		state = {
			first: index === 1,
			last: index === stack.length,
			current
		};

		return current;
	}

	return {
		push: (value: T | ((payload: T) => T)) => {
			stack.length = index;
			// @ts-ignore
			stack[index++] = typeof value === 'function' ? (value)(current) : value;

			return update();
		},
		undo: () => {
			if (index > 1) index -= 1;
			return update();
		},
		redo: () => {
			if (index < stack.length) index += 1;
			return update();
		}
	};
}
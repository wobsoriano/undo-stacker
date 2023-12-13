export default function createStack<T>(current: T) {
	const stack = [current];

	let index = stack.length;

	function update() {
		// biome-ignore lint/style/noParameterAssign: This is a valid use case for parameter reassignment
		current = stack[index - 1];
		return current;
	}

	return {
		push: (value: T | ((current: T) => T)) => {
			stack.length = index;
			stack[index++] =
				typeof value === 'function'
					? (value as (current: T) => T)(current)
					: value;

			return update();
		},
		undo: () => {
			if (index > 1) index -= 1;
			return update();
		},
		redo: () => {
			if (index < stack.length) index += 1;
			return update();
		},
	};
}

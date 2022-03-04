export default function createStack<T>(current: T) {
  const stack = [current]

  let index = stack.length

  function update() {
    current = stack[index - 1]

    return current
  }

  return {
    push: (value: T | ((payload: T) => T)) => {
      stack.length = index
      // @ts-expect-error: Value can be a function
      stack[index++] = typeof value === 'function' ? value(current) : value

      return update()
    },
    undo: () => {
      if (index > 1) index -= 1
      return update()
    },
    redo: () => {
      if (index < stack.length) index += 1
      return update()
    },
  }
}

# undo-stacker

A small utility for managing an undo stack.

## Usage

```js
import createStack from 'undo-stacker'

let value = { answer: 42 }

const stack = createStack(value)

// undo/redo have no effect if we're at the
// beginning/end of the stack
console.log((value = stack.undo())) // { answer: 42 }
console.log((value = stack.redo())) // { answer: 42 }

// stack.push returns the new value
value = stack.push({ answer: 43 })
value = stack.push({ answer: 44 })
value = stack.push({ answer: 45 })

console.log(value) // { answer: 45 }

console.log((value = stack.undo())) // { answer: 44 }
console.log((value = stack.undo())) // { answer: 43 }
console.log((value = stack.undo())) // { answer: 42 }
console.log((value = stack.undo())) // { answer: 42 }

console.log((value = stack.redo())) // { answer: 43 }

// pushing clears anything 'forward' in the stack
value = stack.push({ answer: 99 })

// you can also pass a function to `push`
value = stack.push(value => ({ answer: value.answer + 1 }))

console.log((value = stack.undo())) // { answer: 99 }
console.log((value = stack.undo())) // { answer: 43 }
console.log((value = stack.redo())) // { answer: 99 }
console.log((value = stack.redo())) // { answer: 100 }
console.log((value = stack.redo())) // { answer: 100 }
```

Don't mutate the objects you push to the undo stack; chaos will result. Instead, create a fresh copy each time, either manually or using something like [Immer](https://immerjs.github.io/immer/).

## Credits

This is an exact copy of [svelte-undo](https://github.com/Rich-Harris/svelte-undo) without the svelte dependency.

## License

MIT
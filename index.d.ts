declare function createStack<T>(current: T): {
    push: (value: T | ((payload: T) => T)) => T;
    undo: () => T;
    redo: () => T;
};

export default createStack;
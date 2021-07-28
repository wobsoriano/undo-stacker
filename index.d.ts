declare function createStack<T>(current: T): {
    push: (value: T) => T;
    undo: () => T;
    redo: () => T;
};
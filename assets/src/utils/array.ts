export const removeDuplicates = <T>(array: Array<T>): Array<T> => {
    return Array.from(new Set(array));
}

export const keepArrayIntersections = <T>(arrays: Array<Array<T>>): Array<T> => {
    if (arrays.length === 0) {
        return [];
    }

    if (arrays.length === 1) {
        return arrays[0];
    }

    const [first, ...rest] = arrays;

    return first.filter(element => {
        return rest.every(array => array.includes(element));
    })
}

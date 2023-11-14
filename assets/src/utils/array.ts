export const removeDuplicates = <T>(array: Array<T>): Array<T> => {
    return Array.from(new Set(array));
}

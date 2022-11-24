export function splitWithTail(str: string, delim: string, count: number) {
    const parts = str.split(delim);
    const tail = parts.slice(count).join(",");
    const newTail = tail.replaceAll('","', ",");
    const result = parts.slice(0, count);
    result.push(newTail);
    return result;
}

export function getValueAtPath(src: Record<string, any>, pseudoPath: string) {
    pseudoPath = pseudoPath.startsWith(".") ? pseudoPath : `.${pseudoPath}`;
    const [_, ...path] = pseudoPath.split(".");
    let buff = src;
    for (const step of path) {
        if (buff[step]) {
            buff = buff[step];
        }
    }
    return buff;
}

export function parseEnumerable(enumerable: string): Record<string, any> {
    return enumerable && enumerable.trim() !== "-"
        ? JSON.parse(enumerable)
        : null;
}

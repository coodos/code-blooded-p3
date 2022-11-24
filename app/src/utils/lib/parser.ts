import { Enum, IfThenElse, isFunction } from "./config/functions";
import { getValueAtPath, parseEnumerable, splitWithTail } from "./helpers";
import { IParseFragment } from "./parser.types";

function singleLevelParser(src: Record<string, any>, fragment: IParseFragment) {
    let formatted = "";
    const pathFragments = fragment.srcKey.split("+").map((e) => e.trim());

    let temp = 0;
    for (const path of pathFragments) {
        if (isFunction(path)) {
            formatted = path.includes("ENUM")
                ? Enum(src, path, fragment.enumerable)
                : path.includes("IF")
                ? IfThenElse(src, fragment, path)
                : null;
        } else if (path.startsWith(".")) {
            console.log(path);
            const val = getValueAtPath(src, path);
            console.log(val);
            if (Number(val)) {
                temp += Number(val);
            } else {
                formatted += val;
            }
        } else {
            formatted += path;
        }
    }

    formatted =
        typeof formatted == "string"
            ? formatted.replaceAll('"', "")
            : formatted;
    return temp > 0 ? temp : formatted;
}

function multiLevelParser(src: Record<string, any>, fragment: IParseFragment) {
    const values = [];
    const path = `.${
        splitWithTail(fragment.srcKey.split(".item")[0], ".", 1)[1]
    }`;
    const arr: any[] = getValueAtPath(src, path) as any[];
    for (let [i, val] of arr.entries()) {
        const objVal = singleLevelParser(val, fragment);
        // @ts-ignore
        const { set, extra } = objVal;
        if (set) {
            if (Array.isArray(extra)) {
                val = { ...val, ...extra[0] };
            } else {
                val = { ...val, ...extra };
            }
            values.push(val);
        }
    }
    return values;
}

function parseFragment(fragment: IParseFragment, src: Record<string, any>) {
    const parseAsArray =
        fragment.srcKey.includes(".item") || fragment.dest.includes(".item");
    const result: Record<string, any> = {
        key: fragment.dest.split(".item")[0],
        value: "",
    };
    if (parseAsArray) {
        result.value = multiLevelParser(src, fragment);
    } else {
        result.value = singleLevelParser(src, fragment);
    }

    return result;
}

export function transformObject(src: Record<string, any>, map: string) {
    let [_, ...lines] = map.split("\n");
    const object = {};
    const fragments: IParseFragment[] = lines
        .filter((l) => l.trim() !== "")
        .map((line) => {
            let [_, dest, srcKey, enumerable] = splitWithTail(line, ",", 3);
            return {
                srcKey: srcKey.trim(),
                dest: dest.trim(),
                enumerable: parseEnumerable(enumerable),
            };
        });
    for (const fragment of fragments) {
        const { key, value } = parseFragment(fragment, src);
        // @ts-ignore
        object[key] = value;
    }
    return object;
}

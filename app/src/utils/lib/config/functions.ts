import { getValueAtPath } from "../helpers";
import { IParseFragment } from "../parser.types";
import { comparatorMap } from "./comparator";

const functions = ["ENUM", "IF", "ELSE", "THEN"];

export function isFunction(str: string): boolean {
    let isFunc = false;
    for (const func of functions) {
        if (str.includes(func)) isFunc = true;
    }
    return isFunc;
}

export function Enum(
    src: Record<string, any>,
    str: string,
    enumerable: Record<string, any>
) {
    const path = str.split("ENUM")[1].split("(")[1].split(")")[0].trim();

    // @ts-ignore
    return enumerable[getValueAtPath(src, path)];
}

export function IfThenElse(
    src: Record<string, any>,
    fragment: IParseFragment,
    str: string
) {
    const result: { extra: any[] | Record<string, any>; set: boolean } = {
        extra: {},
        set: true,
    };
    const ifStatement = str.split("IF")[1].split("(")[1].split(")")[0].trim();
    const thenStatement = str.split("THEN")[1].includes("ELSE")
        ? str.split("THEN")[1].split("ELSE")[0].trim()
        : str.split("THEN")[1].trim();
    const elseStatement = str.includes("ELSE")
        ? str.split("ELSE")[1].trim()
        : null;
    const [operatorOne, operand, operatorTwo] = ifStatement.split(" ");
    if (operand) {
        if (
            // @ts-ignore
            comparatorMap.get(operand)(
                String(getValueAtPath(src, operatorOne)),
                String(operatorTwo)
            )
        ) {
            if (thenStatement === "[item]") {
                return result;
            } else {
                const dest = fragment.dest.includes("item")
                    ? fragment.dest.split(".item.")[1].trim()
                    : fragment.dest;
                // @ts-ignore
                result.extra[dest] = getValueAtPath(
                    src,
                    thenStatement.includes("item")
                        ? thenStatement.split("item.")[1]
                        : thenStatement
                );
            }
        } else {
            const dest = fragment.dest.includes("item")
                ? fragment.dest.split(".item.")[1].trim()
                : fragment.dest;
            result.set = false;
            // @ts-ignore
            result.extra[dest] = elseStatement;
        }
    } else {
        if (
            getValueAtPath(
                src,
                operatorOne.includes("item.")
                    ? operatorOne.split("item.")[1]
                    : operatorOne
            )
        ) {
            if (thenStatement === "[item]") {
                return { extra: null, set: true };
            } else {
                const dest = fragment.dest.includes("item")
                    ? fragment.dest.split(".item.")[1].trim()
                    : fragment.dest;
                const extraVal = getValueAtPath(
                    src,
                    thenStatement.includes("item.")
                        ? thenStatement.split("item.")[1]
                        : thenStatement
                );
                try {
                    // @ts-ignore
                    result[extra] = { dest: extraVal };
                } catch {
                    const extras = [];
                    if (Array.isArray(extraVal)) {
                        const key = `.${dest.split(".")[0]}`;
                        const path = `.${
                            thenStatement.split(".")[
                                thenStatement.split(".").length - 1
                            ]
                        }`;
                        for (const item of extraVal) {
                            const val = getValueAtPath(item, path);
                            const obj = new Object();
                            // @ts-ignore
                            obj[key.split(".")[1]] = val;
                            extras.push(obj);
                        }
                    }
                    // @ts-ignore
                    result.extra = extras;
                }

                return result;
            }
        } else {
            return { extra: {}, set: false };
        }
    }

    return result;
}

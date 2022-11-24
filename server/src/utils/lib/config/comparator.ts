export const comparatorMap = new Map<
    string,
    (comparand: any, comparee: any) => any
>();
comparatorMap.set("==", (comparand, comparee) => comparand == comparee);
comparatorMap.set(">=", (comparand, comparee) => comparand >= comparee);
comparatorMap.set("<=", (comparand, comparee) => comparand <= comparee);
comparatorMap.set("!=", (comparand, comparee) => comparand != comparee);
comparatorMap.set("===", (comparand, comparee) => comparand === comparee);

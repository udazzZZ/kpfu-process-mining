export const createActionPrefixHandler =
    (sliceName: string) => (actionName: string) =>
        `${sliceName}/${actionName}`;

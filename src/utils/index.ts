export function pruneJSON<T extends {}>(json: T) {
    Object.keys(json).forEach(key => {
        if (json[key] === undefined) {
            delete json[key]
        }

        if (Array.isArray(json[key]) && json[key].length === 0) {
            delete json[key]
        }
    })
    return json;
}

export const success = (msg, result = null) => {
    return { msg, result }
}
export const error = (msg) => {
    return { msg };
}

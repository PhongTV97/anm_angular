export function isNumber(str) {
    return !isNaN(Number(this.clearComma(str)))
}

export function validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line max-len
    return re.test(email)
}

export function clearComma(str) {
    const regex = /,/gi
    return String(str).trim().replace(regex, '')
}

export function validateRegex(regex, str) {
    return regex.test(str)
}
import parseValue from "./parseValue"

function formatNumber(number: number | string | null): string {
    if (number === null || number === '') {
        return ''
    }

    if (typeof number === 'number') {
        return number.toFixed(0) // only handle integers right now.
    } else {
        return formatNumber(parseValue(number))
    }
}

export default formatNumber
function parseValue(number: string | null): number | null {
    if (!number) {
        return null
    }

    const parsedValue = parseFloat(number)

    if (Number.isNaN(parsedValue)) {
        return null
    }

    return parsedValue
}

export default parseValue
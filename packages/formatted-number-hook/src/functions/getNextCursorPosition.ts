import { FormattedNumberOptions } from "../hooks/useFormattedNumber"
import formatNumber from "./formatNumber"

function getNextCursorPosition(value: number | string | null, options: FormattedNumberOptions): number {
    const inputValue = formatNumber(value, options)

    // If it's 0, the cursor should be at the end
    if (value === 0) {
        return inputValue.length
    }

    const isDecimal = /\./.test(inputValue)

    // If decimal number, we will position cursor at first 0
    if (isDecimal) {
        const firstZeroIndex = inputValue.indexOf('0')

        return firstZeroIndex > -1
            ? firstZeroIndex
            : inputValue.length // position at end
    }

    return inputValue.length
}

export default getNextCursorPosition
import { FormattedNumberOptions } from '../hooks/useFormattedNumber'


function getInputValue(rawValue: string, oldValue: string, options: FormattedNumberOptions): string {
    if (options.maxFractionDigits === 0 || (options.nullable && rawValue === '')) {
        return rawValue // we don't need to do anything
    }

    const [ integerDigits, fractionDigits ] = getDecimalBreakdown(rawValue)

    if (isDecimalDeleted(oldValue, rawValue)) {
        return integerDigits.slice(0, integerDigits.length - options.maxFractionDigits - 1) // remove decimal and one integer 
    }

    const integerPart = getIntegerPart(integerDigits, options)
    const decimalPart = getDecimalPart(fractionDigits, options)

    return `${integerPart}${decimalPart ? `.${decimalPart}` : ''}`
}

function getDecimalBreakdown(value: string): [ string, string ] {
    const integerDigitMatches = value.match(/(?<![.]\d*)(\d*)(?=\.?)/)
    const fractionDigitMatches = value.match(/(?<=\.)\d*/)

    return [
        integerDigitMatches ? integerDigitMatches[0] : '',
        fractionDigitMatches ? fractionDigitMatches[0] : ''
    ]
}

function isDecimalDeleted(oldValue: string, newValue: string) {
    return /\./.test(oldValue) && !/\./.test(newValue)
}

function getIntegerPart(integerDigits: string, _options: FormattedNumberOptions): string {
    return integerDigits.padEnd(1, '0') // for now we just keep them all, but there will be options to modify these soon
}

function getDecimalPart(decimalDigits: string, options: FormattedNumberOptions): string {
    if (decimalDigits.length > options.maxFractionDigits) {
        return getDecimalPart(decimalDigits.slice(0, options.maxFractionDigits), options)
    }

    if (decimalDigits.length < options.minFractionDigits) {
        return getDecimalPart(decimalDigits.padEnd(options.minFractionDigits, '0'), options)
    }

    return decimalDigits
}

export default getInputValue
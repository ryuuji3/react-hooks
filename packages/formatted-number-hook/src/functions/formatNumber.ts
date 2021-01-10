import { FormattedNumberOptions } from '../hooks/useFormattedNumber'
import getInputValue from "./getInputValue"
import parseValue from './parseValue'

function formatNumber(number: number | string | null, options: FormattedNumberOptions): string {
    if (options.nullable && (number === null || number === '')) {
        return ''
    }

    const parsedValue = typeof number === 'string'
        ? parseValue(number)
        : number
    const stringValue = parsedValue?.toString() ?? ''

    return getInputValue(stringValue, stringValue, options)
}

export default formatNumber
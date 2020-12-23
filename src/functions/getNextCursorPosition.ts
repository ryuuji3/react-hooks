import fitInputValueIntoMask from './fitInputValueIntoMask'

/**
 * 
 * @param value 
 * @param mask 
 */
function getNextCursorPosition(value: string, mask: string): number {
    const maskedValue = fitInputValueIntoMask(value, mask)
    const nextPlaceholder = maskedValue.indexOf('#')

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length
}

export default getNextCursorPosition
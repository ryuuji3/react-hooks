import fitInputValueIntoMask from './fitInputValueIntoMask'

/**
 * 
 * @param mask 
 * @param value 
 */
function getNextCursorPosition(mask: string, value: string): number {
    const maskedValue = fitInputValueIntoMask(value, mask)
    const nextPlaceholder = maskedValue.indexOf('#')

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length
}

export default getNextCursorPosition
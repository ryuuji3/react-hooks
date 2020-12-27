import { Mask } from '../hooks/useMask'
import fitInputValueIntoMask from './fitInputValueIntoMask'

/**
 * 
 * @param value 
 * @param mask 
 */
function getNextCursorPosition(value: string, mask: Mask): number {
    const maskedValue = fitInputValueIntoMask(value, mask)
    // The first pattern is one that can't be replaced so we'll position our cursor there.
    const nextPlaceholder = maskedValue.findIndex(characterOrPattern => characterOrPattern instanceof RegExp)

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length
}

export default getNextCursorPosition
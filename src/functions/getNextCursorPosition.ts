import { Mask } from '../hooks/useMask'
import fitInputValueIntoMask from './fitInputValueIntoMask'
import { Logger } from '../hooks/useDebugMode'

/**
 * 
 * @param value 
 * @param mask 
 */
function getNextCursorPosition(value: string, mask: Mask, log: Logger): number {
    const maskedValue = fitInputValueIntoMask(value, mask)
    // The first pattern is one that can't be replaced so we'll position our cursor there.
    const nextPlaceholder = maskedValue.findIndex(characterOrPattern => characterOrPattern instanceof RegExp)

    log(`Cursor position calculated at ${nextPlaceholder}`)

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length
}

export default getNextCursorPosition
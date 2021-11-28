import { Mask } from '../hooks/useMask'
import fitInputValueIntoMask from './fitInputValueIntoMask'

/**
 * 
 * @param value 
 * @param mask 
 */
function getPositionOfNextMaskCharacter(value: string, mask: Mask): number {
    const maskedValue = fitInputValueIntoMask(value, mask)
    // The first pattern is one that can't be replaced so we'll position our cursor there.
    const nextPlaceholder = maskedValue.findIndex(characterOrPattern => characterOrPattern instanceof RegExp)

    // If we don't find a pattern, we'll just position the cursor at the end of the string.
    const position = nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length

    return position
}

export default getPositionOfNextMaskCharacter
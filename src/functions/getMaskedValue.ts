import { Mask } from '../hooks/useMask'
import fitInputValueIntoMask from './fitInputValueIntoMask'


/**
 * Assuming that any patterns that haven't been replaced with a value have not been fulfilled,
 * replace the leftover patterns with their placeholder character.
 * 
 * @param value 
 * @param mask 
 * @param placeholder exact length string
 */
function getMaskedValue(value: string, mask: Mask, placeholder: string): string {
    const maskedValue = fitInputValueIntoMask(value, mask)

    return maskedValue.reduce((result, characterOrPattern, characterIndex) => {
        if (characterOrPattern instanceof RegExp) {
            result[characterIndex] = placeholder.charAt(characterIndex)
        }

        return result
    }, maskedValue).join('')
}

export default getMaskedValue
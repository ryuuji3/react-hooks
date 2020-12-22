import { getMaskFromMaskedValue } from './regexHelpers'
import fitInputValueIntoMask from './fitInputValueIntoMask'


/**
 * 
 * @param value 
 * @param mask 
 * @param maskCharacter 
 */
function getMaskedValue(value: string, mask: string, maskCharacter: string): string {
    let maskCharacters = getMaskFromMaskedValue(mask).split('')
    const maskedValue = fitInputValueIntoMask(value, mask)

    if (maskCharacter.length === 1) {
        return maskedValue.replace(/#/g, maskCharacter) // single mask character replacement
    } else if (maskCharacter.length > 1) {
        // assuming that the display mask matches the same format as the mask
        // character differences must be substitutes for mask special characters like '#'
        maskCharacters = maskedValue.split('')

        return maskCharacters.reduce((result, currentMaskCharacter, characterIndex) => {
            if (currentMaskCharacter === '#') {
                result[characterIndex] = maskCharacter[characterIndex] // replace placeholders with matching display mask character
            }

            return result
        }, maskCharacters).join('')
    }

    return maskedValue // just use the mask as is if no mask character or display mask was specified
}

export default getMaskedValue
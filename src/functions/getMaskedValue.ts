import { getMaskFromMaskedValue } from './regexHelpers'
import fitInputValueIntoMask from './fitInputValueIntoMask'


/**
 * 
 * @param value 
 * @param mask 
 * @param displayMask single character or exact length string
 */
function getMaskedValue(value: string, mask: string | RegExp, displayMask: string): string {
    return typeof mask === 'string'
        ? getMaskedValueForStringMask(value, mask, displayMask)
        : getMaskedValueForRegExpMask(value, mask, displayMask) 
}

function getMaskedValueForStringMask(value: string, mask: string, displayMask: string): string {
    let maskCharacters = getMaskFromMaskedValue(mask).split('')
    const maskedValue = fitInputValueIntoMask(value, mask)

    if (displayMask.length === 1) {
        return maskedValue.replace(/#/g, displayMask) // single mask character replacement
    } else if (displayMask.length > 1) {
        if (displayMask.length)
        // assuming that the display mask matches the same format as the mask
        // character differences must be substitutes for mask special characters like '#'
        maskCharacters = maskedValue.split('')

        return maskCharacters.reduce((result, currentMaskCharacter, characterIndex) => {
            if (currentMaskCharacter === '#') {
                result[characterIndex] = displayMask[characterIndex] // replace placeholders with matching display mask character
            }

            return result
        }, maskCharacters).join('')
    }

    return maskedValue // just use the mask as is if no mask character or display mask was specified
}

function getMaskedValueForRegExpMask(value: string, mask: RegExp, displayMask: string): string {
    return '' // TODO: Implement
}

export default getMaskedValue
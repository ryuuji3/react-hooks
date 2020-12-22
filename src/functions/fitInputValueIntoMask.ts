import { getMaskFromMaskedValue, getNumbersFromMaskedValue } from './regexHelpers'


/**
 * 
 * @param value 
 * @param mask
 */
function fitInputValueIntoMask(value: string, mask: string): string {
    const maskCharacters = getMaskFromMaskedValue(mask).split('')
    const valueCharacters = getNumbersFromMaskedValue(value).split('')

    // replace mask character with matching input character
    maskCharacters.forEach((_, charIndex) => maskCharacters[charIndex] = valueCharacters[charIndex] ?? maskCharacters[charIndex])

    // fit mask array back into mask, preserving spaces and special characters
    return maskCharacters.reduce((result, maskCharacter) => result.replace(/#/, maskCharacter), mask)
}

export default fitInputValueIntoMask
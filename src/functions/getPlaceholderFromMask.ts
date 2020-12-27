import { Mask } from '../hooks/useMask'

/**
 * If placeholder is only one character, then swap all regular expressions with the character.
 * Otherwise just use the placeholder as is.
 * 
 * @param mask 
 * @param placeholder 
 */
export default function getPlaceholderFromMask(mask: Mask, placeholder: string): string {
    if (placeholder.length === 1) {
        return mask.reduce((result, maskCharacterOrPattern, index) => {
            if (maskCharacterOrPattern instanceof RegExp) {
                result[index] = placeholder
            }

            return result
        }, [...mask]).join('')
    } else {
        return placeholder
    }
}
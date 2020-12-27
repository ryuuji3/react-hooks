import { Mask } from '../hooks/useMask'

/**
 * If necessary, we'll convert from old format to new one using this helper.
 * 
 * @param mask 
 */
function parseMask(mask: string | Mask) {
    if (typeof mask === 'string') {
        console.warn('string masks are deprecated, please use the regexp format.')
        return convertStringMaskToRegExpMask(mask)
    } else {
        return mask // it's already the correct format
    }
}

function convertStringMaskToRegExpMask(mask: string): Mask {
    const characters = mask.split('')

    return characters.reduce<Mask>((maskCharacters, character, currentCharacterIndex) => {
        if (/#/.test(character)) {
            maskCharacters[currentCharacterIndex] = /\d/
        }

        return maskCharacters
    }, characters)
}

export default parseMask
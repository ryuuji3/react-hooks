import { Mask } from '../hooks/useMask'


/**
 * Return partial mask with patterns replaced by values.  
 * 
 * @param value 
 * @param mask
 */
function fitInputValueIntoMask(value: string, mask: Mask): Mask {
    const valueCharacters = value.split('')

    let abort = false

    return valueCharacters.reduce((outputMask: Mask, currentCharacter) => {
        if (abort) { // If we failed a match then don't attempt to place characters into mask.
            return outputMask
        }

        const firstMaskPattern: RegExp | null = findFirstPattern(outputMask)

        if (firstMaskPattern?.test(currentCharacter)) {
            outputMask[outputMask.indexOf(firstMaskPattern)] = currentCharacter
        } else {
            abort = true
        }

        return outputMask
    }, [...mask])
}

function findFirstPattern(mask: Mask): RegExp | null {
    // TypeScript isn't smart enough to realize that this MUST be a RegExp or null, and can never be string.
    return mask.find(characterOrPattern => characterOrPattern instanceof RegExp) as RegExp | null
}

export default fitInputValueIntoMask
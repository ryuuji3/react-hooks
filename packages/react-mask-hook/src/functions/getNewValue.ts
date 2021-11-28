import { Logger } from "../hooks/useDebugMode";
import { Mask } from "../hooks/useMask";
import getPositionOfNextMaskCharacter from "./getPositionOfNextMaskCharacter";

/**
 * Calculate the new value using existing value, new value, mask and cursor position.
 * 
 * @param inputValue
 * @param mask
 * @param log 
 * 
 * @returns new value
 */
function getNewValue({
    inputValue,
    oldValue,
    maskedValue,
    mask,
    log,
}: GetNewValueParams): string {
    const newValue = inputValue
        .split('')
        .reduce(( validCharacters, inputCharacter, index ) => {
            const insertedCharacters = validCharacters.slice(0, index)
            const maskPosition = getPositionOfNextMaskCharacter(insertedCharacters, mask, log)
            const maskCharacterOrPattern = mask[maskPosition]

            if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(inputCharacter)) {
                return validCharacters.concat(inputCharacter)
            }

            return validCharacters
        }, '')

    // inputValue is not masked so just return it
    if (oldValue === '') {
        return newValue
    }

    // sometimes the calculated new value is the same as the old value, but we know they deleted a character
    // if the typed value is shorter than the masked value (eg. deleted a masked character)
    if (oldValue === newValue && inputValue.length < maskedValue.length) {
        const newLength = newValue.length - (maskedValue.length - inputValue.length)

        return newValue.slice(0, newLength)
    }

    return newValue
}

interface GetNewValueParams {
    inputValue: string
    oldValue?: string
    maskedValue: string
    mask: Mask
    log: Logger
}

export default getNewValue
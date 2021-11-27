import { Logger } from "../hooks/useDebugMode";
import { Mask } from "../hooks/useMask";
import getPositionOfNextMaskCharacter from "./getNextCursorPosition";

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
    mask,
    log,
}: GetNewValueParams): string {
    return inputValue
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
}

interface GetNewValueParams {
    inputValue: string
    mask: Mask
    log: Logger
}

export default getNewValue
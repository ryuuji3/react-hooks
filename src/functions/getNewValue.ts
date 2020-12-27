import { Logger } from "../hooks/useDebugMode";
import { Mask } from "../hooks/useMask";

/**
 * Calculate the new value using existing value, new value, mask and cursor position.
 * 
 * TODO: This sucks. How do I make it not suck?
 * 
 * @param inputValue 
 * @param oldValue 
 * @param maskedValue 
 * @param mask 
 * @param lastCursorPosition 
 * @param log 
 */
function getNewValue({
    inputValue, 
    oldValue, 
    maskedValue, 
    mask, 
    lastCursorPosition, 
    log,
}: GetNewValueParams) {
    let newValue: string

    if (inputValue.length > maskedValue.length) {
        const maskCharacterOrPattern = mask[lastCursorPosition]
        const insertedCharacter = inputValue.charAt(lastCursorPosition)

        if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
            newValue = `${oldValue}${insertedCharacter}`
            log(`[useMask] inserted character: ${insertedCharacter}`)
        } else {
            newValue = oldValue // ignore
            log(`[useMask] ignored character: ${insertedCharacter}`)
        }
    } else {
        if (oldValue.length === 0) {
            const maskCharacterOrPattern = mask[lastCursorPosition]
            const insertedCharacter = inputValue.charAt(0)

            if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
                newValue = insertedCharacter
                log(`[useMask] inserted character: ${insertedCharacter}`)
            } else {
                newValue = oldValue // ignore
                log(`[useMask] ignored character: ${insertedCharacter}`)
            }
        } else {
            newValue = oldValue.slice(0, oldValue.length - 1) // Remove a character
            log(`[useMask] removed character`)
        }
    }

    return newValue
}

interface GetNewValueParams {
    inputValue: string
    oldValue: string
    maskedValue: string
    mask: Mask
    lastCursorPosition: number
    log: Logger
}

export default getNewValue
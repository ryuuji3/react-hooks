import { useRef, useLayoutEffect, useDebugValue, } from 'react'

/**
 * 
 * @param {string} value 
 * @param {function} onChange 
 * @param {string} mask 
 * @param {string} maskCharacterOrDisplayMask
 * 
 * @returns {object} props
 */
export default function useMask(
    value = '',
    onChange,
    mask,
    maskCharacterOrDisplayMask,
) {
    const inputRef = useRef(null)
    const maskedValue = getMaskedValue(value, mask, maskCharacterOrDisplayMask)
    const placeholder = getMaskedValue('', mask, maskCharacterOrDisplayMask)
    const nextCursorPosition = getNextCursorPosition(mask, value)
    const scheduleAfterRender = useCallbackAfterRender()

    useDebugValue({
        value,
        maskedValue,
        nextCursorPosition,
    })

    function handleChange({ target }) {
        const numbers = getNumbersFromMaskedValue(target.value, mask, maskCharacterOrDisplayMask)
        
        const newValue = target.value.length < placeholder.length
            ? numbers.slice(0, numbers.length < value.length ? numbers.length : numbers.length - 1) // remove a character
            : numbers

        onChange(newValue)

        scheduleAfterRender(() => {
            setCursorPositionForElement(target, getNextCursorPosition(mask, newValue))
        })
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp({ target }) {
        setCursorPositionForElement(target, nextCursorPosition)
    }

    return {
        ref: inputRef,

        'data-value': value.length ? value: undefined,
        value: value.length ? maskedValue : placeholder, // render placeholder if they haven't entered anything
        placeholder,

        onChange: handleChange,
        onKeyUp,
    }
}

/**
 * Run code in returned callback
 * 
 * @returns {function} callback
 */
function useCallbackAfterRender() {
    const lastRun = useRef(null)

    useLayoutEffect(() => {
        lastRun.current?.()
        lastRun.current = null
    })

    return (callback) => { 
        lastRun.current = callback  // schedule callback after render
    }
}

/**
 * 
 * @param {HTMLInputElement} element 
 * @param {number} cursorPosition 
 */
function setCursorPositionForElement(element, cursorPosition) {
    element?.setSelectionRange(cursorPosition, cursorPosition, 'forward')
}

/**
 * 
 * @param {string} mask 
 * @param {string} value
 * 
 * @returns {number} 
 */
function getNextCursorPosition(mask, value) {
    const maskedValue = fitInputValueIntoMask(value, mask)
    const nextPlaceholder = maskedValue.indexOf('#')

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length
}

/**
 * 
 * @param {string} value
 * 
 * @returns {string} 
 */
function getNumbersFromMaskedValue(value) {
    return value
        .replace(/[^\d]/g, '') // remove non numbers
}

/**
 * 
 * @param {string} value
 * 
 * @returns {string} 
 */
function getMaskFromMaskedValue(mask) {
    return mask
        .replace(/[^#]/g, '') // remove non mask characters
}

/**
 * 
 * @param {string} value 
 * @param {string} mask
 * 
 * @returns {string} 
 */
function fitInputValueIntoMask(value, mask) {
    const maskCharacters = getMaskFromMaskedValue(mask).split('')
    const valueCharacters = getNumbersFromMaskedValue(value).split('')

    // replace mask character with matching input character
    maskCharacters.forEach((_, charIndex) => maskCharacters[charIndex] = valueCharacters[charIndex] ?? maskCharacters[charIndex])

    // fit mask array back into mask, preserving spaces and special characters
    return maskCharacters.reduce((result, maskCharacter) => result.replace(/#/, maskCharacter), mask)
}

/**
 * 
 * @param {string} value 
 * @param {string} mask 
 * @param {string} maskCharacter 
 * 
 * @returns {string}
 */
function getMaskedValue(value, mask, maskCharacter) {
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
import { useState, useEffect, useCallback, useRef } from 'react'

export default function useMask(
    initialValue = '',
    mask,
    maskCharacterOrDisplayMask,
    passedOnChange,
) {
    const [ value, setValue ] = useState(initialValue)
    const inputRef = useRef(null)

    const maskedValue = parseValue(value, mask, maskCharacterOrDisplayMask)
    const maskLength = convertMaskStringToArray(mask, maskCharacterOrDisplayMask).length
    const placeholder = parseValue('', mask, maskCharacterOrDisplayMask)
    const nextCursorPosition = getNextCursorPosition(mask, value)

    function onKeyDown({ key }) {
        if (key === 'Backspace') {
            // Remove last character
            setValue(value.substring?.(0, value.length - 1))
        } else if (value.length < maskLength) {
            setValue(`${value}${key}`)
        }
    }

    const updateCursorPosition = useCallback(element => {
        element.setSelectionRange(nextCursorPosition, nextCursorPosition)
    }, [ nextCursorPosition ])

    function onKeyUp({ target }) {
        updateCursorPosition(target)
    }

    function onChange() {
        if (passedOnChange) {
            passedOnChange({
                value,
                maskedValue,
            })
        }
    }

    useEffect(() => {
        const element = inputRef.current

        requestAnimationFrame(() => {
            updateCursorPosition(element)
        })
    }, [ updateCursorPosition, nextCursorPosition ])

    return {
        ref: inputRef,

        'data-value': value.length ? value: undefined,
        value: value.length ? maskedValue : value, // don't render with value if they haven't entered anything
        placeholder,

        onChange,
        onKeyDown,
        onKeyUp,
    }
}

function getNextCursorPosition(mask, value) {
    const maskedValue = fitInputValueIntoMask(value, mask)
    const nextPlaceholder = maskedValue.indexOf('#')

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length
}

function convertValueStringToNumberArray(value) {
    return value
        .replace(/[^\d]/g, '') // remove non numbers
        .split('') // convert value into character array
}

function convertMaskStringToArray(mask) {
    return mask
        .replace(/[^#]/g, '') // remove non mask characters
        .split('') // convert value into character array
}

function fitInputValueIntoMask(value, mask) {
    const maskCharacters = convertMaskStringToArray(mask)
    const valueCharacters = convertValueStringToNumberArray(value)

    // replace mask character with matching input character
    maskCharacters.forEach((_, charIndex) => maskCharacters[charIndex] = valueCharacters[charIndex] ?? maskCharacters[charIndex])

    // fit mask array back into mask, preserving spaces and special characters
    return maskCharacters.reduce((result, maskCharacter) => result.replace(/#/, maskCharacter), mask)
}

function parseValue(value, mask, maskCharacter) {
    let maskCharacters = convertMaskStringToArray(mask)
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
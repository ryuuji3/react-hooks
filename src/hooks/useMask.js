import { useRef, useLayoutEffect, useDebugValue, } from 'react'

export default function useMask(
    value = '',
    onChange,
    mask,
    maskCharacterOrDisplayMask,
) {
    const inputRef = useRef(null)

    const maskedValue = getMaskedValue(value, mask, maskCharacterOrDisplayMask)
    const maskLength = getMaskFromMaskedValue(mask, maskCharacterOrDisplayMask).length
    const placeholder = getMaskedValue('', mask, maskCharacterOrDisplayMask)
    const nextCursorPosition = getNextCursorPosition(mask, value)

    useDebugValue({
        value,
        maskedValue,
        nextCursorPosition,
    })

    function handleChange({ target }) {
        const newMaskedValue = getMaskedValue(target.value, mask, maskCharacterOrDisplayMask)

        if (value.length < maskLength) {
            onChange(getNumbersFromMaskedValue(newMaskedValue))
        } else if (getNumbersFromMaskedValue(newMaskedValue).length <= getNumbersFromMaskedValue(maskedValue).length) {
            onChange(value.slice(0, value.length - 1))
        }
    }

    function onKeyUp({ target }) {
        setCursorPositionForElement(target, nextCursorPosition)
    }
    
    useLayoutEffect(() => {
        const element = inputRef.current

        setCursorPositionForElement(element, nextCursorPosition)
    }, [ nextCursorPosition ])

    return {
        ref: inputRef,

        'data-value': value.length ? value: undefined,
        value: value.length ? maskedValue : '', // don't render with value if they haven't entered anything
        placeholder,

        onChange: handleChange,
        onKeyUp,
    }
}

function setCursorPositionForElement(element, cursorPosition) {
    element?.setSelectionRange(cursorPosition, cursorPosition, 'forward')
}

function getNextCursorPosition(mask, value) {
    const maskedValue = fitInputValueIntoMask(value, mask)
    const nextPlaceholder = maskedValue.indexOf('#')

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length
}

function getNumbersFromMaskedValue(value) {
    return value
        .replace(/[^\d]/g, '') // remove non numbers
}

function getMaskFromMaskedValue(mask) {
    return mask
        .replace(/[^#]/g, '') // remove non mask characters
}

function fitInputValueIntoMask(value, mask) {
    const maskCharacters = getMaskFromMaskedValue(mask).split('')
    const valueCharacters = getNumbersFromMaskedValue(value).split('')

    // replace mask character with matching input character
    maskCharacters.forEach((_, charIndex) => maskCharacters[charIndex] = valueCharacters[charIndex] ?? maskCharacters[charIndex])

    // fit mask array back into mask, preserving spaces and special characters
    return maskCharacters.reduce((result, maskCharacter) => result.replace(/#/, maskCharacter), mask)
}

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
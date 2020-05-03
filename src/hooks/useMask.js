import { useState, useEffect } from 'react'

export default function useMask(
    initialValue = '',
    mask,
    maskCharacterOrDisplayMask,
    onChange,
) {
    const [ value, setValue ] = useState(initialValue)
    const maskedValue = parseValue(value, mask, maskCharacterOrDisplayMask)
    const maskLength = convertMaskStringToArray(mask, maskCharacterOrDisplayMask).length

    let placeholder = maskedValue // assuming that value is ''

    function onKeyPress(e) {
        const { key } = e

        if (value.length < maskLength) {
            setValue(`${value}${key}`)
        }
    }

    function onKeyDown(e) {
        if (e.key === 'Backspace') {
            // Remove last character
            setValue(value.substring?.(0, value.length - 1))
        }
    }

    useEffect(() => {
        onChange && onChange({
            value,
            maskedValue,
        })
    }, [ value, maskedValue, onChange ])

    return {
        value: value.length ? maskedValue : value, // don't render with value if they haven't entered anything
        placeholder,

        onChange: e => e.preventDefault(), // Do nothing
        onKeyPress,
        onKeyDown,
    }
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

function parseValue(value, mask, maskCharacter) {
    let maskCharacters = convertMaskStringToArray(mask)
    const valueCharacters = convertValueStringToNumberArray(value)

    // replace mask character with matching input character
    maskCharacters.forEach((_, charIndex) => maskCharacters[charIndex] = valueCharacters[charIndex] ?? maskCharacters[charIndex])

    // fit mask array back into mask, preserving spaces and special characters
    const maskedValue = maskCharacters.reduce((result, maskCharacter) => result.replace(/#/, maskCharacter), mask)

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
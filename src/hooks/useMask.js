import { useState } from 'react'


export default function useMask(
    mask,
    maskCharacter = '#',
    initialValue = '',
) {
    const [ value, setValue ] = useState(initialValue)
    const maskedValue = value?.length ? parseValue(value, mask, maskCharacter) : ''
    const maskLength = convertMaskStringToArray(mask, maskCharacter).length

    let placeholder = mask

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

    // Only needed so that React doesn't think we can't control the component
    function onChange(e) {
        e.preventDefault()
    }

    return {
        value: maskedValue,
        placeholder,

        onChange,
        onKeyPress,
        onKeyDown,
    }
}

function convertValueStringToNumberArray(value) {
    return value
        .replace(/[^\d]/g, '') // remove non numbers
        .split('') // convert value into character array
}

function convertMaskStringToArray(mask, maskCharacter) {
    const maskRegex = new RegExp(`[^${maskCharacter}]`, 'g')

    return mask
        .replace(maskRegex, '') // remove non mask characters
        .split('') // convert value into character array
}

function parseValue(value, mask, maskCharacter) {
    const maskCharacters = convertMaskStringToArray(mask, maskCharacter)
    const valueCharacters = convertValueStringToNumberArray(value)

    // replace mask character with matching input character
    maskCharacters.forEach((_, charIndex) => maskCharacters[charIndex] = valueCharacters[charIndex] ?? maskCharacters[charIndex])

    // fit mask array back into mask, preserving spaces and special characters
    const maskRegex = new RegExp(`${maskCharacter}`)

    return maskCharacters.reduce((result, maskCharacter) => result.replace(maskRegex, maskCharacter), mask)
}
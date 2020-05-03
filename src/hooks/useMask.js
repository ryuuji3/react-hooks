import { useState } from 'react'


export default function useMask(
    mask,
    maskCharacter,
    initialValue,
) {
    let placeholder = ''
    let value = ''
    let maxLength = mask.length

    function onChange() {}
    function onKeyPress() {}

    return {
        value,
        placeholder,
        maxLength,

        onChange,
        onKeyPress,
    }
}
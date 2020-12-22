import { useRef, useDebugValue, } from 'react'

import useCallbackAfterRender from './hooks/useCallbackAfterRender'
import getMaskedValue from './functions/getMaskedValue'
import getNextCursorPosition from './functions/getNextCursorPosition'

import { getNumbersFromMaskedValue } from './functions/regexHelpers'

/**
 * 
 * @param value 
 * @param onChange 
 * @param mask 
 * @param maskCharacterOrDisplayMask 
 */
export default function useMask(
    value = '',
    onChange: (value: string) => void,
    mask: string,
    maskCharacterOrDisplayMask: string,
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

    function handleChange({ target }: { target: HTMLInputElement }) {
        const numbers = getNumbersFromMaskedValue(target.value)
        
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
    function onKeyUp({ target }: { target: HTMLInputElement }) {
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
 * 
 * @param element 
 * @param cursorPosition 
 */
function setCursorPositionForElement(element: HTMLInputElement, cursorPosition: number): void {
    element?.setSelectionRange(cursorPosition, cursorPosition, 'forward')
}
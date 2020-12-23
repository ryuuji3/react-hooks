import { useRef, useDebugValue, } from 'react'

import useCallbackAfterRender from './useCallbackAfterRender'
import getMaskedValue from '../functions/getMaskedValue'
import getNextCursorPosition from '../functions/getNextCursorPosition'

import { getNumbersFromMaskedValue } from '../functions/regexHelpers'

/**
 * 
 * @param value 
 * @param onChange 
 * @param mask 
 * @param displayMask 
 */
export default function useMask(
    value = '',
    onChange: (value: string) => void,
    mask: string | RegExp,
    displayMask: string,
    options: MaskOptions = defaultOptions,
) {
    const inputRef = useRef(null)
    const maskedValue = getMaskedValue(value, mask, displayMask)
    const placeholder = getMaskedValue('', mask, displayMask)
    const nextCursorPosition = getNextCursorPosition(value, mask)
    const scheduleAfterRender = useCallbackAfterRender()

    useDebugValue(options.debug && {
        value,
        maskedValue,
        nextCursorPosition,
    })

    function handleChange({ target }: { target: HTMLInputElement }) {
        const numbers = getNumbersFromMaskedValue(target.value)
        
        const newValue = (
            target.value.length < placeholder.length // deleted a mask symbol
            && numbers.length >= value.length // a number was deleted so we don't need to remove another
        )
            ? numbers.slice(0, numbers.length - 1) // remove a character
            : numbers

        onChange(newValue)

        // onChange is asynchronous so update cursor after it re-renders
        scheduleAfterRender(() => {
            setCursorPositionForElement(target, getNextCursorPosition(newValue, mask))
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

interface MaskOptions {
    debug: boolean
}
const defaultOptions = {
    debug: false,
}

/**
 * 
 * @param element 
 * @param cursorPosition 
 */
function setCursorPositionForElement(element: HTMLInputElement, cursorPosition: number): void {
    element?.setSelectionRange(cursorPosition, cursorPosition, 'forward')
}
import { useRef, KeyboardEvent, ChangeEvent, FocusEvent, } from 'react'

import useCallbackAfterRender from './useCallbackAfterRender'
import getMaskedValue from '../functions/getMaskedValue'
import getNextCursorPosition from '../functions/getNextCursorPosition'

import { getNumbersFromMaskedValue } from '../functions/regexHelpers'
import useDebugMode from './useDebugMode'

/**
 * 
 * @param value 
 * @param onChange 
 * @param mask 
 * @param displayMask 
 */
export default function useMask<T = HTMLInputElement>(
    value = '',
    onChange: (value: string) => void,
    mask: string | RegExp,
    displayMask: string,
    options: MaskOptions = defaultOptions,
) {
    if (mask instanceof RegExp) {
        console.warn(`[useMask] RegExp mask not implemented yet.`)
    }

    const inputRef = useRef<T>(null)
    const maskedValue = getMaskedValue(value, mask, displayMask)
    const placeholder = getMaskedValue('', mask, displayMask)
    const nextCursorPosition = getNextCursorPosition(value, mask)
    const scheduleAfterRender = useCallbackAfterRender()

    useDebugMode(options.debug, {
        mask,
        displayMask,
        value,
        maskedValue,
    })

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
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
    function onKeyUp({ target }: KeyboardEvent<HTMLInputElement>) {
        setCursorPositionForElement(target as HTMLInputElement, nextCursorPosition)
    }

    function onKeyDown({ target}: KeyboardEvent<HTMLInputElement>) {
        // make sure cursor is positioned correctly before input happens
        // or else the character might not be in the right position
        setCursorPositionForElement(target as HTMLInputElement, nextCursorPosition)
    }

    function onFocus({ target }: FocusEvent<HTMLInputElement>) {
        // Work around in chrome to make sure focus sets cursor position
        requestAnimationFrame(() => {
            setCursorPositionForElement(target as HTMLInputElement, getNextCursorPosition(target.value, mask))
        })
    }

    return {
        ref: inputRef,

        'data-value': value.length ? value: undefined,
        value: value.length ? maskedValue : placeholder, // render placeholder if they haven't entered anything
        placeholder,

        onChange: handleChange,
        onKeyDown,
        onKeyUp,
        onFocus,
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
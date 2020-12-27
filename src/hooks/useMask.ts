import { KeyboardEvent, ChangeEvent, FocusEvent, useMemo, } from 'react'

import useCallbackAfterRender from './useCallbackAfterRender'
import getMaskedValue from '../functions/getMaskedValue'
import getNextCursorPosition from '../functions/getNextCursorPosition'

import useDebugMode from './useDebugMode'
import parseMask from '../functions/convertStringMaskToRegexp'
import getPlaceholderFromMask from '../functions/getPlaceholderFromMask'

/**
 * 
 * @param value 
 * @param onChange 
 * @param mask 
 * @param displayMask 
 */
export function useMask({
    value = '',
    onChange,
    debug = false,
    ...props
}: MaskProps): InputProps {
    const mask = useMemo(() => parseMask(props.mask), [ props.mask ])
    const placeholder = useMemo(() => getPlaceholderFromMask(mask, props.placeholder), [ mask, props.placeholder ])

    const maskedValue = getMaskedValue(value, mask, placeholder)
    const lastCursorPosition = getNextCursorPosition(value, mask)
    const scheduleAfterRender = useCallbackAfterRender()

    useDebugMode(debug, {
        mask,
        placeholder,
        value,
        maskedValue,
    })

    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        let newValue: string

        if (target.value.length > maskedValue.length) {
            const maskCharacterOrPattern = mask[lastCursorPosition]
            const insertedCharacter = target.value.charAt(lastCursorPosition)

            if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
                newValue = `${value}${insertedCharacter}`
            } else {
                newValue = value // ignore
            }
        } else {
            newValue = value.slice(0, value.length - 1) // Remove a character
        }

        onChange(newValue)

        // onChange is asynchronous so update cursor after it re-renders
        scheduleAfterRender(() => {
            setCursorPositionForElement(target, getNextCursorPosition(newValue, mask))
        })
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp({ target }: KeyboardEvent<HTMLInputElement>) {
        setCursorPositionForElement(target as HTMLInputElement, lastCursorPosition)
    }

    function onKeyDown({ target}: KeyboardEvent<HTMLInputElement>) {
        // make sure cursor is positioned correctly before input happens
        // or else the character might not be in the right position
        setCursorPositionForElement(target as HTMLInputElement, lastCursorPosition)
    }

    function onFocus({ target }: FocusEvent<HTMLInputElement>) {
        // Work around in chrome to make sure focus sets cursor position
        requestAnimationFrame(() => {
            setCursorPositionForElement(target as HTMLInputElement, getNextCursorPosition(target.value, mask))
        })
    }

    return {
        'data-value': value.length ? value: undefined,
        value: value.length ? maskedValue : placeholder, // render placeholder if they haven't entered anything
        placeholder,

        onChange: handleChange,
        onKeyDown,
        onKeyUp,
        onFocus,
    }
}

/**
 * Props you need to pass to useMask()
 */
interface MaskProps {
    value: string
    onChange: (value: string) => void
    mask: string | Mask
    placeholder: string
    debug?: boolean
}

/**
 * Props you need to spread onto your input.
 */
interface InputProps {
    'data-value'?: string
    value: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void
    onFocus: (e: FocusEvent<HTMLInputElement>) => void
}

type Mask = Array<string | RegExp>

/**
 * 
 * @param element 
 * @param cursorPosition 
 */
function setCursorPositionForElement(element: HTMLInputElement, cursorPosition: number): void {
    element?.setSelectionRange(cursorPosition, cursorPosition, 'forward')
}

export default useMask
export type {
    MaskProps,
    Mask,
    InputProps,
}
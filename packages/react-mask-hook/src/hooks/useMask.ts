import { KeyboardEvent, ChangeEvent, ClipboardEvent, FocusEvent, useMemo } from 'react'

import useCallbackAfterRender from '@ryuuji3/use-callback-after-render'
import getMaskedValue from '../functions/getMaskedValue'
import getPositionOfNextMaskCharacter from '../functions/getPositionOfNextMaskCharacter'

import useDebugMode from './useDebugMode'
import parseMask from '../functions/convertStringMaskToRegexp'
import getPlaceholderFromMask from '../functions/getPlaceholderFromMask'
import getNewValue from '../functions/getNewValue'
import fitInputValueIntoMask from '../functions/fitInputValueIntoMask'

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
    
    const { log } = useDebugMode(debug, {
        mask,
        placeholder,
        value,
        maskedValue,
    })
    
    const nextCursorPosition = getPositionOfNextMaskCharacter(value, mask, log)
    const scheduleAfterRender = useCallbackAfterRender()

    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        let newValue = getNewValue({
            inputValue: target.value,
            mask,
            log,
        })

        onChange(newValue)

        // onChange is asynchronous so update cursor after it re-renders
        scheduleAfterRender(() => {
            setCursorPositionForElement(target, getPositionOfNextMaskCharacter(newValue, mask, log))
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
            setCursorPositionForElement(target as HTMLInputElement, getPositionOfNextMaskCharacter(target.value, mask, log))
        })
    }

    function onPaste({ clipboardData, target }: ClipboardEvent) {
        const text = clipboardData?.getData('Text') ?? ''

        log(`Pasted text: ${text}`)

        let newValue = getNewValue({
            inputValue: text,
            mask,
            log,
        })

        log(`New value from clipboard: ${newValue}`)

        onChange(newValue)

        scheduleAfterRender(() => {
            setCursorPositionForElement(target as HTMLInputElement, getPositionOfNextMaskCharacter(newValue, mask, log))
        })
    }

    return {
        'data-value': value.length ? value: undefined,
        value: value.length ? maskedValue : '',
        placeholder,

        onChange: handleChange,
        onKeyDown,
        onKeyUp,
        onFocus,
        onPaste,
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
    onPaste: (e: ClipboardEvent<HTMLInputElement>) => void
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
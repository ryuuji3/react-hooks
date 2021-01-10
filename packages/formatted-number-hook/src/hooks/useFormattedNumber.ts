import { ChangeEvent, KeyboardEvent, FocusEvent } from 'react'

import useCallbackAfterRender from '@ryuuji3/use-callback-after-render'

import formatNumber from '../functions/formatNumber'
import parseValue from '../functions/parseValue'
import getNextCursorPosition from '../functions/getNextCursorPosition'
import getInputValue from '../functions/getInputValue'


function useFormattedNumber({
    value,
    onChange,
    ...rawOptions
}: FormattedNumberProps): InputProps {
    const options = getOptionsWithDefaultValues(rawOptions)
    const formattedValue = formatNumber(value, options)
    const scheduleAfterRender = useCallbackAfterRender()
    const lastCursorPosition = getNextCursorPosition(value, options)

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        const inputValue = getInputValue(target.value, formattedValue, options)
        console.log(`raw value: ${target.value} new input value: ${inputValue}`)

        const newValue = inputValue === ''
            ? null
            : parseValue(inputValue) ?? value as number // use previous value if cannot parse

        onChange(newValue) // value will always be a number

        scheduleAfterRender(() => {
            setCursorPositionForElement(target, getNextCursorPosition(newValue, options))
        })
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp({ target }: KeyboardEvent<HTMLInputElement>) {
        setCursorPositionForElement(target as HTMLInputElement, lastCursorPosition)
    }

    function onFocus({ target }: FocusEvent<HTMLInputElement>) {
        // Work around in chrome to make sure focus sets cursor position
        requestAnimationFrame(() => {
            setCursorPositionForElement(target as HTMLInputElement, getNextCursorPosition(value, options))
        })
    }
    
    return {
        value: formattedValue,
        onChange: handleChange,
        onFocus,
        onKeyUp,
    }
}

/**
 * 
 * @param element 
 * @param cursorPosition 
 */
function setCursorPositionForElement(element: HTMLInputElement, cursorPosition: number): void {
    element?.setSelectionRange(cursorPosition, cursorPosition)
}

function getOptionsWithDefaultValues(overrideOptions: Partial<FormattedNumberOptions>): FormattedNumberOptions {
    const defaultOptions = {
        maxFractionDigits: 0,
        minFractionDigits: 0,
        nullable: true, // if false, empty value becomes 0
    }

    return {
        ...defaultOptions,
        ...Object.entries(overrideOptions).reduce((sanitizedOptions, [propKey, propValue])  => {
            return {
                ...sanitizedOptions,
                [propKey]: propValue ?? (defaultOptions as any)[propKey] // turn off intellisense
            }
        }, {})
    }
}

interface FormattedNumberOptions {
    maxFractionDigits: number
    minFractionDigits: number
    nullable: boolean
}

interface FormattedNumberProps extends Partial<FormattedNumberOptions> {
    [propName: string]: FormattedNumberProps[keyof FormattedNumberProps]
    value: number | string | null
    onChange: (value: number | null) => void
}

interface InputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void
    onFocus: (e: FocusEvent<HTMLInputElement>) => void
}

export default useFormattedNumber
export type {
    FormattedNumberOptions,
    FormattedNumberProps,
    InputProps,
}
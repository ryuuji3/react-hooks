import React from 'react'
import { render, createEvent, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DateDemo } from '../.storybook/stories/Demo.stories'
import { copyText, pasteText } from './utilities/clipboard'

it('should render numbers into mask as the user types', () => {
    const { input, onChange } = setup()

    userEvent.click(input) // focus input

    // initial state
    expect(input).toHaveAttribute('placeholder', 'DD - MM - YYYY')
    expect(input.selectionStart).toBe('DD - MM - YYYY'.indexOf('D'))

    // enter a few numbers (should ignore non-numbers)
    userEvent.type(input, '28ab')

    expect(input).toHaveValue('28 - MM - YYYY')
    expect(onChange).toHaveBeenCalledWith('28')
    expect(input.selectionStart).toBe('28 - MM - YYYY'.indexOf('M'))

    // input the rest of the numbers
    userEvent.type(input, '101995')

    expect(input).toHaveValue('28 - 10 - 1995')
    expect(onChange).toHaveBeenCalledWith('28101995')
    expect(input.selectionStart).toBe('28 - 10 - 1995'.length)

    // backspace
    // regression: make sure to delete a mask character when backspacing
    userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}{backspace}')

    expect(input).toHaveValue('28 - 1M - YYYY')
    expect(onChange).toHaveBeenCalledWith('281')
    expect(input.selectionStart).toBe('28 - 1M - YYYY'.indexOf('M'))
})

it('should allow user to paste incomplete date into input', () => {
    const { input, onChange } = setup()

    // Example: un-formatted postal code should be parsed correctly
    // regression: partial date 
    pasteText(input, '28/10')

    expect(input).toHaveValue('28 - 10 - YYYY')
    expect(onChange).toHaveBeenCalledWith('2810')
    expect(input.selectionStart).toBe('28 - 10 - YYYY'.indexOf('Y'))
})

it.skip('should add formatted value to users clipboard', () => {
    const { input } = setup()

    copyText(input)

    // not sure how to confirm what enters users clipboard 🤔
})

function setup() {
    const onChange = jest.fn()

    const { getByLabelText } = render(<DateDemo onChange={onChange} />)
    const input = getByLabelText(/date/i) as HTMLInputElement

    return { input, onChange }
}
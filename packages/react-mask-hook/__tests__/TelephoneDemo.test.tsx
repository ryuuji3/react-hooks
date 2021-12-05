import React from 'react'
import { render, createEvent, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import refocus from './utilities/refocus'
import { TelephoneDemo } from '../.storybook/stories/Demo.stories'

it('should render numbers into mask as the user types', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<TelephoneDemo onChange={onChange} />)
    const input = getByLabelText(/phone number/i) as HTMLInputElement

    userEvent.click(input) // focus input

    // initial state
    expect(input).toHaveAttribute('placeholder', '(___)-___-____')
    expect(input.selectionStart).toBe(0) // cursor at start

    // enter a few numbers (should ignore non-numbers)
    userEvent.type(input, '613abc')

    expect(input).toHaveValue('(613)-___-____')
    expect(onChange).toHaveBeenCalledWith('613')
    expect(input.selectionStart).toBe('(613)-___-____'.indexOf('_'))

    // input the rest of the numbers
    userEvent.type(input, '8888888')

    expect(input).toHaveValue('(613)-888-8888')
    expect(onChange).toHaveBeenCalledWith('6138888888')
    expect(input.selectionStart).toBe('(613)-888-8888'.length)

    // backspace
    // regression: make sure to delete a mask character when backspacing
    userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}{backspace}')

    expect(input).toHaveValue('(613)-88_-____')
    expect(onChange).toHaveBeenCalledWith('61388')
    expect(input.selectionStart).toBe('(613)-88_-____'.indexOf('_'))
})

it('should allow user to copy and paste phone number into input', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<TelephoneDemo onChange={onChange} />)
    const input = getByLabelText(/phone number/i) as HTMLInputElement

    // Example: pre-formatted phone number should be parsed correctly
    // regression: supply incomplete value
    const formattedPhoneNumber = '613-888'

    // Bypass jsdom not having clipboard support
    const paste = createEvent.paste(input, {
        clipboardData: {
            getData: () => formattedPhoneNumber,
        }
    })
    fireEvent(input, paste)

    expect(input).toHaveValue('(613)-888-____')
    expect(onChange).toHaveBeenCalledWith('613888')
    expect(input.selectionStart).toBe('(613)-888-____'.indexOf('_'))
})

it('should position cursor on next mask placeholder when focused', async () => {
    const { getByLabelText } = render(<TelephoneDemo onChange={jest.fn()} />)
    const input = getByLabelText(/phone number/i) as HTMLInputElement

    await refocus(input)

    expect(input.selectionStart).toBe(0) // special case: we dont show masked value until they type

    userEvent.type(input, '613')

    await refocus(input)

    expect(input.selectionStart).toBe('(613)-___-____'.indexOf('_')) // cursor at mask placeholder

    // entire complete value
    userEvent.type(input, '8888888')

    await refocus(input)

    expect(input.selectionStart).toBe('(613)-888-8888'.length) // cursor at end
})
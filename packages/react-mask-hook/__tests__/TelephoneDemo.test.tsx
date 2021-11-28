import React from 'react'
import { render, createEvent, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
    userEvent.type(input, '{backspace}')

    expect(input).toHaveValue('(613)-888-888_')
    expect(onChange).toHaveBeenCalledWith('613888888')
    expect(input.selectionStart).toBe('(613)-888-888_'.indexOf('_'))
})

it('should allow user to copy and paste phone number into input', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<TelephoneDemo onChange={onChange} />)
    const input = getByLabelText(/phone number/i) as HTMLInputElement

    // Example: pre-formatted phone number should be parsed correctly
    const formattedPhoneNumber = '613-888-8888'

    // Bypass jsdom not having clipboard support
    const paste = createEvent.paste(input, {
        clipboardData: {
            getData: () => formattedPhoneNumber,
        }
    })
    fireEvent(input, paste)

    expect(input).toHaveValue('(613)-888-8888')
    expect(onChange).toHaveBeenCalledWith('6138888888')
    expect(input.selectionStart).toBe('(613)-888-8888'.length)
})
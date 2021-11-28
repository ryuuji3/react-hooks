import React from 'react'
import { render, createEvent, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PostalCodeDemo } from '../.storybook/stories/Demo.stories'

it('should render postal code into mask as the user types', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<PostalCodeDemo onChange={onChange} />)
    const input = getByLabelText(/postal code/i) as HTMLInputElement

    userEvent.click(input) // focus input

    // initial state
    expect(input).toHaveAttribute('placeholder', '___ ___')
    expect(input.selectionStart).toBe(0) // cursor at start

    // enter part of the postal code (should ignore characters that dont fit)
    userEvent.type(input, 'A1AB')

    expect(input).toHaveDisplayValue('A1A ___')
    expect(onChange).toHaveBeenCalledWith('A1A')
    expect(input.selectionStart).toBe('A1A ___'.indexOf('_'))

    // input the rest of the postal code
    userEvent.type(input, 'A1A 1A1')

    expect(input).toHaveDisplayValue('A1A 1A1')
    expect(onChange).toHaveBeenCalledWith('A1A1A')
    expect(input.selectionStart).toBe('A1A 1A1'.length)

    // backspace
    // regression: make sure to delete a mask character when backspacing
    userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}')

    expect(input).toHaveDisplayValue('A1_ ___')
    expect(onChange).toHaveBeenCalledWith('A1')
    expect(input.selectionStart).toBe('A1_ ___'.indexOf('_'))
})

it('should allow user to copy and paste postal code into input', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<PostalCodeDemo onChange={onChange} />)
    const input = getByLabelText(/postal code/i) as HTMLInputElement

    // Example: un-formatted postal code should be parsed correctly
    const unformattedPostalCode = 'A1A'

    // Bypass jsdom not having clipboard support
    const paste = createEvent.paste(input, {
        clipboardData: {
            getData: () => unformattedPostalCode,
        }
    })
    fireEvent(input, paste)

    expect(input).toHaveValue('A1A ___')
    expect(onChange).toHaveBeenCalledWith('A1A')
    expect(input.selectionStart).toBe('A1A ___'.indexOf('_'))
})
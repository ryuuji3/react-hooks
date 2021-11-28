import React from 'react'
import { render, createEvent, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DateDemo } from '../.storybook/stories/Demo.stories'

it('should render numbers into mask as the user types', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<DateDemo onChange={onChange} />)
    const input = getByLabelText(/date/i) as HTMLInputElement

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
    userEvent.type(input, '{backspace}')

    expect(input).toHaveValue('28 - 10 - 199Y')
    expect(onChange).toHaveBeenCalledWith('2810199')
    expect(input.selectionStart).toBe('28 - 10 - 199Y'.indexOf('Y'))
})

it('should allow user to copy and paste unformatted phone number into input', () => {
    const onChange = jest.fn()
    const { getByLabelText } = render(<DateDemo onChange={onChange} />)
    const input = getByLabelText(/date/i) as HTMLInputElement

    // Example: un-formatted postal code should be parsed correctly
    const formattedDate = '28/10/1995'

    // Bypass jsdom not having clipboard support
    const paste = createEvent.paste(input, {
        clipboardData: {
            getData: () => formattedDate,
        }
    })
    fireEvent(input, paste)

    expect(input).toHaveValue('28 - 10 - 1995')
    expect(onChange).toHaveBeenCalledWith('28101995')
    expect(input.selectionStart).toBe('28 - 10 - 1995'.length)
})
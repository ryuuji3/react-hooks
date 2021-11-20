import React from 'react'
import { render, } from '@testing-library/react'
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
    userEvent.type(input, '{backspace}')

    expect(input).toHaveDisplayValue('A1A 1A_')
    expect(onChange).toHaveBeenCalledWith('A1A1A')
    expect(input.selectionStart).toBe('A1A 1A_'.indexOf('_'))
})
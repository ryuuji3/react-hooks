import React from 'react'
import {
    render,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Integer } from '../.storybook/stories/Demo.stories'


test('should render input value as empty string if value is null', () => {
    const { getByLabelText } = render(<Integer value={null} onChange={jest.fn()} />)

    expect(getByLabelText(/integer/i)).toHaveDisplayValue('')
})

test('should render input value as integer if user enters integers', () => {
    const { getByLabelText } = render(<Integer value={null} onChange={jest.fn()} />)
    const input = getByLabelText(/integer/i)

    userEvent.type(input, '123')

    expect(getByLabelText(/integer/i)).toHaveDisplayValue('123')
})

test('should render input value as integer if user backspaces', () => {
    const { getByLabelText } = render(<Integer value={123} onChange={jest.fn()} />)
    const input = getByLabelText(/integer/i)

    userEvent.type(input, '{backspace}')

    expect(getByLabelText(/integer/i)).toHaveDisplayValue('12')
})

test.skip('should render decimal input as integer', () => {
    const { getByLabelText } = render(<Integer value={null} onChange={jest.fn()} />)
    const input = getByLabelText(/integer/i)

    userEvent.type(input, '12.3')

    expect(getByLabelText(/integer/i)).toHaveDisplayValue('123')
})

test.skip('should render integer ignoring invalid input', () => {
    const { getByLabelText } = render(<Integer value={null} onChange={jest.fn()} />)
    const input = getByLabelText(/integer/i)

    userEvent.type(input, '123aaaaa.5.2')

    expect(getByLabelText(/integer/i)).toHaveDisplayValue('12352')
})

test('should render number initial value value as integer', () => {
    const { getByLabelText } = render(<Integer value={0.0} onChange={jest.fn()} />)

    expect(getByLabelText(/integer/i)).toHaveDisplayValue('0')
})

test('should render string initial value value as integer', () => {
    const { getByLabelText } = render(<Integer value={'0.0'} onChange={jest.fn()} />)

    expect(getByLabelText(/integer/i)).toHaveDisplayValue('0')
})
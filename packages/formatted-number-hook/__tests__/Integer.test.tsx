import React from 'react'
import {
    render,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Integer } from '../.storybook/stories/Demo.stories'


test('should render input value as empty string if value is null', () => {
    const { getByLabelText } = render(<Integer initialValue={null} onChange={jest.fn()} />)

    expect(getByLabelText(/number/i)).toHaveDisplayValue('')
})

test('should render input value as integer if user enters integers', () => {
    const { getByLabelText } = render(<Integer initialValue={null} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '123')

    expect(getByLabelText(/number/i)).toHaveDisplayValue('123')
})

test('should delete number if user presses backspace once', () => {
    const { getByLabelText } = render(<Integer initialValue={123} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '{backspace}')

    expect(getByLabelText(/number/i)).toHaveDisplayValue('12')
})

test('should delete number if user presses deletes entire value', () => {
    const { getByLabelText } = render(<Integer initialValue={123} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '{backspace}{backspace}{backspace}')

    expect(getByLabelText(/number/i)).toHaveDisplayValue('')
})

test('should render decimal input as integer', () => {
    const { getByLabelText } = render(<Integer initialValue={null} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '12.3')

    expect(getByLabelText(/number/i)).toHaveDisplayValue('123')
})

test('should render integer ignoring invalid input', () => {
    const { getByLabelText } = render(<Integer initialValue={null} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '1203aaaaa.5.2')

    expect(getByLabelText(/number/i)).toHaveDisplayValue('120352')
})

test('should render number initial value value as integer', () => {
    const { getByLabelText } = render(<Integer initialValue={0.0} onChange={jest.fn()} />)

    expect(getByLabelText(/number/i)).toHaveDisplayValue('0')
})

test('should render string initial value value as integer', () => {
    const { getByLabelText } = render(<Integer initialValue={'0.0'} onChange={jest.fn()} />)

    expect(getByLabelText(/number/i)).toHaveDisplayValue('0')
})
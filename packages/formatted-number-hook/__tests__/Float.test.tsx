import React from 'react'
import {
    render,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Float } from '../.storybook/stories/Demo.stories'

function FixedLengthFloat({ initialValue, onChange, nullable }: FixedLengthFloatProps) {
    return <Float minFractionDigits={1} maxFractionDigits={1} initialValue={initialValue} onChange={onChange} nullable={nullable} />
}
interface FixedLengthFloatProps { 
    initialValue: string | number | null, 
    onChange: (value: number | null) => void 
    nullable?: boolean
}


test('should render input value as empty string if initial value is null', () => {
    const { getByLabelText } = render(<FixedLengthFloat initialValue={null} onChange={jest.fn()} />)

    expect(getByLabelText(/number/i)).toHaveDisplayValue('')
})

test('should render input value as 0.0 if initial value is null and nullable enabled', () => {
    const { getByLabelText } = render(<FixedLengthFloat nullable={false} initialValue={null} onChange={jest.fn()} />)

    expect(getByLabelText(/number/i)).toHaveDisplayValue('0.0')
})


test('should render number initial value value with one decimal place', () => {
    const { getByLabelText } = render(<FixedLengthFloat initialValue={0.0} onChange={jest.fn()} />)

    expect(getByLabelText(/number/i)).toHaveDisplayValue('0.0')
})

test('should allow user to enter a float automaticaly inserting decimal sign', () => {
    const { getByLabelText } = render(<FixedLengthFloat initialValue={null} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '1.1')

    expect(input).toHaveDisplayValue('1.1')
})

test.only('should allow you to delete value by backspacing', () => {
    const { getByLabelText } = render(<FixedLengthFloat initialValue={1} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '{backspace}')

    expect(input).toHaveDisplayValue('')
})

test('should allow user to overwrite number in front of decimal if initial value starts with 0', () => {
    const { getByLabelText } = render(<FixedLengthFloat initialValue={0.1} onChange={jest.fn()} />)
    const input = getByLabelText(/number/i)

    userEvent.type(input, '1')

    expect(input).toHaveDisplayValue('1.0')
})
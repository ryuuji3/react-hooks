import React from 'react'
import {
    render,
} from '@testing-library/react'

import { Integer } from '../.storybook/stories/Demo.stories'


let onChange
let input: HTMLInputElement

describe('Given an input with decimals disabled without an initial value', () => {
    beforeEach(() => {
        onChange = jest.fn()
        const { getByLabelText } = render(<Integer value={null} onChange={onChange} />)
        input = getByLabelText(/integer/i) as HTMLInputElement
    })

    it('should not render a value', () => {
        expect(input).toHaveDisplayValue('')
    })
})

describe('Given an input with decimals disabled with an initial value', () => {
    beforeEach(() => {
        onChange = jest.fn()
        const { getByLabelText } = render(<Integer value={0.0} onChange={onChange} />)
        input = getByLabelText(/integer/i) as HTMLInputElement
    })

    it('should render the value as an integer', () => {
        expect(input).toHaveDisplayValue('0')
    })
})
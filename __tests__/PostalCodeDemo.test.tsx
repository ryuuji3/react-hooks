import React from 'react'
import { render, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PostalCodeDemo from '../.storybook/stories/components/PostalCodeDemo'


describe.skip('Given an input with a telephone mask', () => {
    let input: HTMLInputElement
    let onChange = jest.fn()

    beforeEach(() => {
        const { getByLabelText } = render(<PostalCodeDemo onChange={onChange} />)
        input = getByLabelText(/postal code/i) as HTMLInputElement
    })

    it('should render placeholder with mask', () => {
        expect(input).toHaveAttribute('placeholder', '___ ___')
    })

    describe('When user types numbers and letters into the mask', () => {
        beforeEach(() => {
            userEvent.type(input, 'A1A')
        })

        it('should render the numbers and letters and the mask in the input', () => {
            expect(input).toHaveDisplayValue('A1A ___')
        })

        it('should call onChange with raw value', () => {
            expect(onChange).toHaveBeenCalledWith('A1A')
        })

        it.skip('should place cursor at beginning of next placeholder', () => {
            expect(input.selectionStart).toBe('A1A ___'.indexOf('_'))
        })

        describe.skip('When user enters the remaining numbers and letters into the mask', () => {
            beforeEach(() => {
                userEvent.type(input, 'A1A 1A1')
            })

            it('should render the numbers and letters into the mask in the input', () => {
                expect(input).toHaveDisplayValue('A1A 1A1')
            })

            it('should call onChange with raw value', () => {
                expect(onChange).toHaveBeenCalledWith('A1A1A1')
            })

            it('should place cursor at end of input', () => {
                expect(input.selectionStart).toBe('A1A 1A1'.length)
            })

            describe('When the user hits backspace', () => {
                beforeEach(() => {
                    userEvent.type(input, '{backspace}')
                })

                it('should render the mask without the last character', () => {
                    expect(input).toHaveDisplayValue('A1A 1A_')
                })

                it('should call onChange with raw value', () => {
                    expect(onChange).toHaveBeenCalledWith('A1A1A')
                })

                it('should place cursor at beginning of next placeholder', () => {
                    expect(input.selectionStart).toBe('A1A 1A_'.indexOf('_'))
                })
            })
        })
    })
})
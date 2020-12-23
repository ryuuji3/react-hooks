import React from 'react'
import { render, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import DateDemo from '../src/stories/components/DateDemo'

describe('Given an input with a date mask', () => {
    let onChange = jest.fn()
    let input: HTMLInputElement

    beforeEach(() => {
        const { getByLabelText } = render(<DateDemo onChange={onChange} />)
        input = getByLabelText(/date mask/i) as HTMLInputElement
    })

    it('should render placeholder with mask', () => {
        expect(input).toHaveAttribute('placeholder', 'DD - MM - YYYY')
    })

    describe('When user types numbers into the mask', () => {
        beforeEach(() => {
            userEvent.type(input, '28')
        })

        it('should render the numbers and the mask in the input', () => {
            expect(input).toHaveValue('28 - MM - YYYY')
        })

        it('should call onChange with raw value', () => {
            expect(onChange).toHaveBeenCalledWith('28')
        })

        it('should place cursor at beginning of next placeholder', () => {
            expect(input.selectionStart).toBe('28 - MM - YYYY'.indexOf('M'))
        })

        describe('When user enters the remaining numbers into the mask', () => {
            beforeEach(() => {
                userEvent.type(input, '101995')
            })

            it('should render the numbers into the mask in the input', () => {
                expect(input).toHaveValue('28 - 10 - 1995')
            })

            it('should call onChange with raw value', () => {
                expect(onChange).toHaveBeenCalledWith('28101995')
            })

            it('should place cursor at end of input', () => {
                expect(input.selectionStart).toBe('28 - 10 - 1995'.length)
            })

            describe('When the user hits backspace', () => {
                beforeEach(() => {
                    userEvent.type(input, '{backspace}')
                })

                it('should render the mask without the last character', () => {
                    expect(input).toHaveValue('28 - 10 - 199Y')
                })

                it('should call onChange with raw value', () => {
                    expect(onChange).toHaveBeenCalledWith('2810199')
                })

                it('should place cursor at beginning of next placeholder', () => {
                    expect(input.selectionStart).toBe('28 - 10 - 199Y'.indexOf('Y'))
                })
            })
        })
    })
})
import React from 'react'
import { render, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TelephoneDemo from './TelephoneDemo'


describe('Given an input with a telephone mask', () => {
    let instance
    let input
    let onChange = jest.fn()

    beforeEach(() => {
        instance = render(<TelephoneDemo onChange={onChange} />)
        input = instance.getByLabelText(/phone mask/i)
    })

    it('should render placeholder with mask', () => {
        expect(input).toHaveAttribute('placeholder', '(___)-___-____')
    })

    describe('When user types numbers into the mask', () => {
        beforeEach(() => {
            userEvent.type(input, '613')
        })

        it('should render the numbers and the mask in the input', () => {
            expect(input).toHaveValue('(613)-___-____')
        })

        it('should call onChange with raw value, and masked value', () => {
            expect(onChange).toHaveBeenCalledWith('613')
        })

        it('should place cursor at beginning of next placeholder', () => {
            expect(input.selectionStart).toBe('(613)-___-____'.indexOf('_'))
        })

        describe('When user enters the remaining numbers into the mask', () => {
            beforeEach(() => {
                userEvent.type(input, '8888888')
            })

            it('should render the numbers into the mask in the input', () => {
                expect(input).toHaveValue('(613)-888-8888')
            })

            it('should call onChange with raw value, and masked value', () => {
                expect(onChange).toHaveBeenCalledWith('6138888888')
            })

            it('should place cursor at end of input', () => {
                expect(input.selectionStart).toBe('(613)-888-8888'.length)
            })

            describe('When the user hits backspace', () => {
                beforeEach(() => {
                    userEvent.type(input, '{backspace}')
                })

                it('should render the mask without the last character', () => {
                    expect(input).toHaveValue('(613)-888-888_')
                })

                it('should call onChange with raw value, and masked value', () => {
                    expect(onChange).toHaveBeenCalledWith('613888888')
                })

                it('should place cursor at beginning of next placeholder', () => {
                    expect(input.selectionStart).toBe('(613)-888-888_'.indexOf('_'))
                })
            })
        })
    })
})
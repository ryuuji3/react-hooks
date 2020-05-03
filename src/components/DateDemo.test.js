import React from 'react'
import { render, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import DateDemo from './DateDemo'

describe('Given an input with a telephone mask', () => {
    let instance
    let input

    beforeEach(() => {
        instance = render(<DateDemo />)
        input = instance.getByLabelText(/date mask/i)
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

        describe('When user enters the remaining numbers into the mask', () => {
            beforeEach(() => {
                userEvent.type(input, '101995')
            })

            it('should render the numbers into the mask in the input', () => {
                expect(input).toHaveValue('28 - 10 - 1995')
            })

            describe('When the user hits backspace', () => {
                beforeEach(() => {
                    fireEvent.keyDown(input, {
                        key: 'Backspace'
                    })
                })

                it('should render the mask without the last character', () => {
                    expect(input).toHaveValue('28 - 10 - 199Y')
                })
            })
        })
    })
})
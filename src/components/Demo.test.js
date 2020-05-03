import React from 'react'
import { render, fireEvent, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TelephoneDemo from './TelephoneDemo'


describe('Given an input with a telephone mask', () => {
    let instance
    let input

    beforeEach(() => {
        instance = render(<TelephoneDemo />)
        input = instance.getByLabelText(/phone mask/i)
    })

    it('should render placeholder with mask', () => {
        expect(input).toHaveAttribute('placeholder', '###-###-####')
    })

    describe('When user types numbers into the mask', () => {
        beforeEach(() => {
            userEvent.type(input, '613')
        })

        it('should render the numbers and the mask in the input', () => {
            expect(input).toHaveValue('613-###-####')
        })

        describe('When user enters the remaining numbers into the mask', () => {
            beforeEach(() => {
                userEvent.type(input, '8888888')
            })

            it('should render the numbers into the mask in the input', () => {
                expect(input).toHaveValue('613-888-8888')
            })

            describe('When the user hits backspace', () => {
                beforeEach(() => {
                    fireEvent.keyDown(input, {
                        key: 'Backspace'
                    })
                })

                it('should render the mask without the last character', () => {
                    expect(input).toHaveValue('613-888-888#')
                })
            })
        })
    })
})
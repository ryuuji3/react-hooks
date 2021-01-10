// @ts-nocheck
import React from 'react'

import { FormattedNumberOptions } from '../../src/index'
import Demo from './components/Demo'

const story = {
    title: 'Demo',
    args: {
        initialValue: '',
        nullable: true,
    }
}

export default story

function Template(args: StoryProps) {
    return <Demo {...args} label="Enter a number" />
}

export const Integer = Template.bind({ })
Integer.parameters = {
    onChange: () => {}, // Only needed for tests
}

export const Float = Template.bind({ })
Float.args = {
    maxFractionDigits: 1,
    minFractionDigits: 1,
}
Float.parameters = {
    onChange: () => {}, // Only needed for tests
}

interface StoryProps extends Partial<FormattedNumberOptions> {
    initialValue: number | string | null
    onChange: (value: number | null) => void
}
// @ts-nocheck
import React from 'react'

import Demo from './components/Demo'

const story = {
    title: 'Demo',
}

export default story

function Template(args: StoryProps) {
    return <Demo {...args} label="Enter a number" />
}

export const Integer = Template.bind({ })
Integer.args = {
    initialValue: '',
}
Integer.parameters = {
    onChange: () => {}, // Only needed for tests
}

export const Float = Template.bind({ })
Float.args = {
    initialValue: '',
}
Float.parameters = {
    onChange: () => {}, // Only needed for tests
}

interface StoryProps {
    label: string
    value: number | string | null
    onChange: (value: number | null) => void
}
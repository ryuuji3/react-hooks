import React from 'react'

import Demo from './components/Demo'

const story = {
    title: 'Demo',
}

export default story

export const Integer = ({ onChange, value }: StoryProps) => (
    <Demo
        label="Enter an integer"
        value={value}
        onChange={onChange}
    />
)

export const Float = ({ onChange, value }: StoryProps) => (
    <Demo
        label="Enter a decimal number"
        value={value}
        onChange={onChange}
    />
)

interface StoryProps {
    value: number | string | null
    onChange: (value: number | null) => void
}
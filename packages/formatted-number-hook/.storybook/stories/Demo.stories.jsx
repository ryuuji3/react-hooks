import React from 'react';

import Demo from './components/Demo'

const story = {
    title: 'Demo',
}

export default story

export const integerDemo = () => (
    <Demo
        label="Enter an integer"
    />
)

export const decimalDemo = () => (
    <Demo
        label="Enter a decimal number"
    />
)
import React from 'react';

import Demo from './components/Demo'

const story = {
    title: 'Demo',
}

export default story

export const DateDemo = ({ onChange }: { onChange: (value: string) => void}) => (
    <Demo
        label="Please enter a date:"
        mask={[
            /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/
        ]}
        placeholder="DD - MM - YYYY"
        onChange={onChange}
        debug
    />
)

export const TelephoneDemo = ({ onChange }: { onChange: (value: string) => void}) => (
    <Demo
        label="Please enter a telephone number:"
        mask={[
            '(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,
        ]}
        placeholder="_"
        onChange={onChange}
        debug
    />
)

export const PostalCodeDemo = ({ onChange }: { onChange: (value: string) => void}) => (
    <Demo
        label="Please enter a postal code:"
        mask={[
            /[a-z]/i, /\d/, /[a-z]/i, ' ', /\d/, /[a-z]/i, /\d/, 
        ]}
        placeholder="_"
        onChange={onChange}
        debug
    />
)
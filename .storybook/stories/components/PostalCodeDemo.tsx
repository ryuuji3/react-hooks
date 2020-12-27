import React, { useState } from 'react'
import useMask from '../../../src'


export default function PostalCodeDemo({ onChange }: PostalCodeDemoProps) {
    const [ value, setValue ] = useState('')

    function handleChange(value: string) {
        onChange?.(value)
        setValue(value)
    }
    const maskProps = useMask({
        value,
        onChange: handleChange,
        mask: [ /[a-z]/i, /[\d]/, /[a-z]/i, " ", /[\d]/, /[a-z]/i, /[\d]/ ],
        placeholder: '_',
        debug: true
    })

    return (
        <label>
            Sample input with postal code mask:
            <input
                name="test"
                {...maskProps}
            />
        </label>
    );
}

interface PostalCodeDemoProps {
    onChange: (value: string) => void
}
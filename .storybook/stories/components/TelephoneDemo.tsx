import React, { useState } from 'react'
import useMask from '../../../src'


export default function TelephoneDemo({ onChange }: TelephoneDemoProps) {
    const [ value, setValue ] = useState('')

    function handleChange(value: string) {
        onChange?.(value)
        setValue(value)
    }
    const maskProps = useMask(
        value,
        handleChange,
        '(###)-###-####',
        '(___)-___-____',
    )

    return (
        <label>
            Sample input with phone mask:
            <input
                name="test"
                type="tel"
                {...maskProps}
            />
        </label>
    );
}

interface TelephoneDemoProps {
    onChange: (value: string) => void
}
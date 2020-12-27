import React, { useState } from 'react'
import useMask from '../../../src'


export default function TelephoneDemo({ onChange, debug }: TelephoneDemoProps) {
    const [ value, setValue ] = useState('')

    function handleChange(value: string) {
        onChange?.(value)
        setValue(value)
    }
    const maskProps = useMask({
        value,
        onChange: handleChange,
        mask: '(###)-###-####',
        placeholder: '_',
        debug,
    })

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
    debug?: boolean
}
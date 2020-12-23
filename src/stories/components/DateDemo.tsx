import React, { useState } from 'react'
import useMask from '../..'


export default function DateDemo({ onChange }: DateDemoProps) {
    const [ value, setValue ] = useState('')

    function handleChange(value: string) {
        onChange?.(value)
        setValue(value)
    }
    const maskProps = useMask(
        value,
        handleChange,
        '## - ## - ####',
        'DD - MM - YYYY',
    )

    return (
        <label>
            Sample input with date mask:
            <input
                name="test"
                type="text"
                {...maskProps}
            />
        </label>
    );
}

interface DateDemoProps { 
    onChange: (value: string) => void
}
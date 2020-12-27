import React, { useState } from 'react'
import useMask from '../../../src'


export default function DateDemo({ onChange, debug }: DateDemoProps) {
    const [ value, setValue ] = useState('')

    function handleChange(value: string) {
        onChange?.(value)
        setValue(value)
    }
    const maskProps = useMask({
        value,
        onChange: handleChange,
        mask: '## - ## - ####',
        placeholder: 'DD - MM - YYYY',
        debug,
    })

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
    debug?: boolean
}
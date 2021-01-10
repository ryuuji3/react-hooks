import React, { useState } from 'react'

import useFormattedNumber from '../../../src/index'


function Demo({ label, value, onChange }: DemoProps) {
    const [ number, setNumber ] = useState(value)

    function handleChange(newValue: number | null) {
        onChange?.(newValue)
        setNumber(newValue)
    }

    const inputProps = useFormattedNumber({
        value: number,
        onChange: handleChange,
    })

    return (
        <div>
            <label htmlFor="test" style={{
                display: 'block',
            }}>
                {label}
            </label>
            <input
                id="test"
                name="test"
                {...inputProps}
            />
        </div>
    );
}

interface DemoProps {
    label: string
    value: number | string | null
    onChange: (value: number | null) => void
    debug?: boolean
}

export default Demo
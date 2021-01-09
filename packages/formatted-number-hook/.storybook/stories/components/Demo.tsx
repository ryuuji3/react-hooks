import React, { useState } from 'react'

import useFormattedNumber from '../../../src/index'


function Demo({ label, onChange }: DemoProps) {
    const [ value, setValue ] = useState(null)

    function handleChange(value: number) {
        onChange?.(value)
        setValue(value)
    }

    const inputProps = useFormattedNumber({
        value,
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
    onChange: (value: number) => void
    debug?: boolean
}

export default Demo
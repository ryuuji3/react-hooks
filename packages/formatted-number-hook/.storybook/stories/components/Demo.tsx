import React, { useState, useEffect } from 'react'

import useFormattedNumber from '../../../src/index'


function Demo({ label, initialValue, onChange }: DemoProps) {
    const [ number, setNumber ] = useState(initialValue)

    useEffect(() => {
        setNumber(initialValue)
    }, [ initialValue ])

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
    initialValue: number | string | null
    onChange: (value: number | null) => void
    debug?: boolean
}

export default Demo
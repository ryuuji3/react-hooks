import React, { useState } from 'react'

import useMask, { Mask } from '../../../src/index'


function Demo({ label, onChange, debug, mask, placeholder, }: DemoProps) {
    const [ value, setValue ] = useState('')

    function handleChange(value: string) {
        onChange?.(value)
        setValue(value)
    }

    const maskProps = useMask({
        value,
        onChange: handleChange,
        mask,
        placeholder,
        debug,
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
                {...maskProps}
            />
        </div>
    );
}

interface DemoProps {
    label: string
    onChange: (value: string) => void
    debug?: boolean
    mask: Mask,
    placeholder: string
}

export default Demo
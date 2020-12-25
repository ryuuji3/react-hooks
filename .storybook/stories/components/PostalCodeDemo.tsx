import React, { useState } from 'react'
import useMask from '../../../src'


export default function PostalCodeDemo({ onChange }: PostalCodeDemoProps) {
    const [ value, setValue ] = useState('')

    function handleChange(value: string) {
        onChange?.(value)
        setValue(value)
    }
    const maskProps = useMask(
        value,
        handleChange,
        /[a-z][\d][a-z] [\d][a-z][\d]/,
        '___ ___',
    )

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
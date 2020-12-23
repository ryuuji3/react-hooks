import React, { useState } from 'react'
import useMask from '../..'


export default function PostalCodeDemo({ onChange }) {
    const [ value, setValue ] = useState('')

    function handleChange(value) {
        onChange?.(value)
        setValue(value)
    }
    const maskProps = useMask(
        value,
        handleChange,
        /[A-Z][\d][A-Z] [\d][A-Z][\d]/,
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
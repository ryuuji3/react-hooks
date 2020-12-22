import React, { useState } from 'react'
import useMask from '../../useMask'


export default function DateDemo({ onChange }) {
    const [ value, setValue ] = useState('')

    function handleChange(value) {
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
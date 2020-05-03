import useMask from '../hooks/useMask'
import React from 'react'

export default function DateDemo() {
    const { value, placeholder, onKeyPress, onKeyDown, onChange, } = useMask(
        '',
        '## - ## - ####',
        'DD - MM - YYYY',
    )

    return (
        <label>
            Sample input with date mask:
            <input
                name="test"
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
            />
        </label>
    );
}
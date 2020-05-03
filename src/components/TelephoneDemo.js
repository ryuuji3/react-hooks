import useMask from '../hooks/useMask'
import React from 'react'

export default function TelephoneDemo() {
    const { value, placeholder, onKeyPress, onKeyDown, onChange, } = useMask(
        '###-###-####',
        '#',
        '',
    )

    return (
        <label>
            Sample input with phone mask:
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
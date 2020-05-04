import useMask from '../hooks/useMask'
import React from 'react'

export default function TelephoneDemo({ onChange }) {
    const maskProps = useMask(
        '',
        '(###)-###-####',
        '(___)-___-____',
        onChange,
    )

    return (
        <label>
            Sample input with phone mask:
            <input
                name="test"
                type="tel"
                {...maskProps}
            />
        </label>
    );
}
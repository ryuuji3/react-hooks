import useMask from '../hooks/useMask'
import React from 'react'

export default function DateDemo({ onChange }) {
    const maskProps = useMask(
        '',
        '## - ## - ####',
        'DD - MM - YYYY',
        onChange,
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
import React from 'react';
import useMask from '../hooks/useMask'

function Demo() {
  const { value, onChange, onKeyPress, placeholder, maxLength } = useMask(
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
            maxLength={maxLength}
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
      </label>
  );
}

export default Demo;

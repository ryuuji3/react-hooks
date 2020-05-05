react-mask-hook
---

An input masking lib designed to be testable and with simplicity in mind.

### Installation:

```bash
npm install react-mask-hook
```

### Sample Usage:

```js
import useMask from 'react-mask-hook'

function TelephoneDemo() {
    const maskProps = useMask(
        '',
        '###-###-####',
        '_', // renders mask like ___-___-____
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

function DateDemo() {
    const maskProps = useMask(
        '',
        '## - ## - ####',
        'DD - MM - YYYY', // Will render the mask exactly like this (ie. the displayed mask)
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
```

### API

```js
const { value, placeholder, onChange, onKeyDown, onKeyPress, onKeyUp } = useMask(initialValue, mask, maskCharacterOrDisplayMask)
```

Arguments:

| argument | description |
| --- | --- |
| `initialValue` | is the initial string value. It can include special characters used in the mask; they are ignored. |
| `mask` | is what should be displayed and with # as a placeholder for the numbers to be input. 
| `maskCharacterOrDisplayMask` | The third argument is a single character to use as the displayed placeholder instead of #, or it can be an entire string that matches the mask but with different characters are the placeholder. Your displayed mask must have the same length as the mask. |

You may opt-out of placeholder, but the other properties returned by `useMask` are required and should be bound to the input in order for the masking to function as expected.
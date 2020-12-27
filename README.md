![Run tests](https://github.com/ryuuji3/react-mask-hook/workflows/Run%20tests/badge.svg?branch=master)

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
function PostalCodeDemo() {
    const [ value, setValue ] = useState('')
    const maskProps = useMask({
        value,
        onChange: handleChange,
        // array of regexp and formatting characters
        mask: [ /[a-z]/i, /[\d]/, /[a-z]/i, " ", /[\d]/, /[a-z]/i, /[\d]/ ], 
        placeholder: '_', // renders all regexp with _ (ie. "___ ___")
    })

    return (
        <label>
            Sample input with postal code mask:
            <input
                name="test"
                type="text"
                {...maskProps}
            />
        </label>
    );
}

function TelephoneDemo() {
    const [ value, setValue ] = useState('')
    const maskProps = useMask({
        value,
        onChange: handleChange,
        mask: '(###)-###-####', // deprecated syntax but still supported
        placeholder: '_',
    })

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
    const [ value, setValue ] = useState('')
    const maskProps = useMask({
        value,
        onChange: handleChange,
        mask: '## - ## - ####',
        placeholder: 'DD - MM - YYYY', // will render mask exactly like this
    })

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
const { value, placeholder, onChange, onKeyUp, onKeyDown, onFocus } = useMask(value, onChange, mask, maskCharacterOrDisplayMask)
```

Arguments:

| argument | description |
| --- | --- |
| `value` | is the string value without formatting. this will hold only numbers |
| `onChange` | is the callback used to update value. you must supply local state or deferred state.
| `mask` | is what should be displayed and with # as a placeholder for the numbers to be input. 
| `maskCharacterOrDisplayMask` | The third argument is a single character to use as the displayed placeholder instead of #, or it can be an entire string that matches the mask but with different characters are the placeholder. Your displayed mask must have the same length as the mask. |

You may opt-out of placeholder, but the other properties returned by `useMask` are required and should be bound to the input in order for the masking to function as expected.
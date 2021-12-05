![Run tests](https://github.com/ryuuji3/react-hooks/workflows/Run%20tests/badge.svg?branch=master)

react-mask-hook
---

An input masking lib designed to be testable and with simplicity in mind.

### Installation:

```bash
npm install @ryuuji3/react-mask-hook
```

### Sample Usage:

```js
import useMask from '@ryuuji3/react-mask-hook'

function PostalCodeDemo() {
    const [ value, setValue ] = useState('')

    function handleChange(value) {
        setValue(value.toUpperCase()) // render as uppercase
    }

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
        onChange: setValue,
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
        onChange: setValue,
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
const { value, placeholder, onChange, onKeyUp, onKeyDown, onFocus, onPaste } = useMask({ value, onChange, mask, placeholder, copyFormatted })
```

Arguments:

| argument | description |
| --- | --- |
| `value` | is the string value without formatting. this will hold only the raw values without formatting characters or spaces |
| `onChange` | is the callback used to update value. you must supply local state or deferred state.
| `mask` | is an array of regular expressions and formatting characters. 
| `placeholder` | The third argument is a single character to use as the displayed placeholder instead of the regular expression, or it can be an entire string that matches the mask but with different characters are the placeholder. Your displayed mask must have the same length as the mask. |
| `copyFormatted` | Upon copying input, will allow you to choose between having the formatted or un-formatted value be copied. |

You may opt-out of placeholder, but the other properties returned by `useMask` are required and should be bound to the input in order for the masking to function as expected.
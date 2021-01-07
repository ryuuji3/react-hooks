![Run tests](https://github.com/ryuuji3/react-hooks/workflows/Run%20tests/badge.svg?branch=master)

react-mask-hook
---

An React hook to schedule layout effects after next render.

### Installation:

```bash
npm install @ryuuji3/use-callback-after-render
```

### Sample Usage:

```js
import useCallbackAfterRender from '@ryuuji3/use-callback-after-render'

function Component() {
    const [ value, setValue ] = useState('')
    const scheduleAfterNextRender = useCallbackAfterRender()

    function handleChange(e) {
        setValue(e.target.value) // this is asynchronous

        // because setValue is asynchronous, we want to run a layout effect AFTER next render
        scheduleAfterNextRender(() => {
            e.target.selectionStart = 0 // reset cursor to start
        })
    }

    return <input value={value} onChange={handleChange}>
}
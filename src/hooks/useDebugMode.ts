import { useDebugValue, useRef } from 'react'

function useDebugMode(debug: boolean, values: DebugModeValues) {
    const hasDisplayedDebugInfo = useRef(false)

    // Add debugging in inspector
    useDebugValue(debug && values)

    if (debug && hasDisplayedDebugInfo.current === false) {
        console.log(displayDebugInfo(values))
        hasDisplayedDebugInfo.current = true
    }
}

function getMask(mask: string | Array<String | RegExp>) {
    return typeof mask === 'string'
        ? `"${mask}"`
        : mask.join(',')
}

function displayDebugInfo(values: DebugModeValues) {
    return (
`useMask Debug Info:

Mask: ${getMask(values.mask)}
Display Mask: "${values.placeholder}"
`
)
}

interface DebugModeValues {
    mask: string | Array<String | RegExp>
    placeholder: string
    value: string
    maskedValue: string
}

export default useDebugMode
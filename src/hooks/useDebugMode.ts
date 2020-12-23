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

function getMask(mask: string | RegExp) {
    return typeof mask === 'string'
        ? `"${mask}"`
        : `/${mask.source}/`
}

function displayDebugInfo(values: DebugModeValues) {
    return (
`useMask Debug Info:

Mask: ${getMask(values.mask)}
Display Mask: "${values.displayMask}"
`
)
}

interface DebugModeValues {
    mask: string | RegExp
    displayMask: string
    value: string
    maskedValue: string
}

export default useDebugMode
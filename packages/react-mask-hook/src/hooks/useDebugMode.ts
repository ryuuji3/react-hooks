import { useDebugValue, useRef } from 'react'

function useDebugMode(debug: boolean, values: DebugModeValues) {
    const hasDisplayedDebugInfo = useRef(false)

    // Add debugging in inspector
    useDebugValue(debug && values)

    if (debug && hasDisplayedDebugInfo.current === false) {
        console.log(displayDebugInfo(values))
        hasDisplayedDebugInfo.current = true
    }

    return {
        log: log(debug),
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

enum LogLevel {
    INFO = 'log',
    WARN = 'warn',
    ERROR = 'error',
}

function log(debug: boolean): Logger {
    return (message: string, level: LogLevel = LogLevel.INFO) => {
        if (!debug) {
            return
        }

        switch(level) {
            case LogLevel.WARN:
                console.warn(message)
                break
            case LogLevel.ERROR:
                console.error(message)
                break
            case LogLevel.INFO:
            default:
                console.log(message)
                break
        }
    }
}

type Logger = (message: string, level?: LogLevel) => void

interface DebugModeValues {
    mask: string | Array<String | RegExp>
    placeholder: string
    value: string
    maskedValue: string
}

export default useDebugMode
export type {
    LogLevel,
    Logger,
}
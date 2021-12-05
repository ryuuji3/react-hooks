import { createEvent, fireEvent } from '@testing-library/react'

function copyText(input: HTMLInputElement) {
    // Bypass jsdom not having clipboard support
    const copyEvent = createEvent.copy(input, {
        clipboardData: {
            getData: () => input.value,
        }
    })

    fireEvent(input, copyEvent)
}

function pasteText(input: HTMLInputElement, text: string) {
    // Bypass jsdom not having clipboard support
    const pasteEvent = createEvent.paste(input, {
        clipboardData: {
            getData: () => text,
        }
    })

    fireEvent(input, pasteEvent)
}

export { copyText, pasteText }
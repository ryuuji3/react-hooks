import { fireEvent } from '@testing-library/react'

import flush from './flush'

/**
 * Blur, then focus and wait for animation callbacks to complete.
 * Needed because some behavior is asynchronous and would not otherwise be caught in the test.
 * 
 * @param input 
 */
async function refocus(input: HTMLInputElement) {
    // Only blur if focused
    if (document.activeElement === input) {
        fireEvent.blur(input)
    }
    
    fireEvent.focus(input)
    await flush()
}

export default refocus
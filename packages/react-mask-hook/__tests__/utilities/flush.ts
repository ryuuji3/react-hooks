import { waitFor } from '@testing-library/react';


/**
 * Useful utility to assert that animation and promise callbacks have been fired.
 */
async function flush() {
    const animationCallback = jest.fn();
    const promiseCallback = jest.fn();
    const timerCallback = jest.fn();

    // schedule callbacks
    requestAnimationFrame(animationCallback);
    Promise.resolve().then(promiseCallback);
    new Promise(resolve => setTimeout(resolve, 0)).then(timerCallback);

    await Promise.all([
        waitFor(() => expect(animationCallback).toHaveBeenCalledTimes(1)),
        waitFor(() => expect(promiseCallback).toHaveBeenCalledTimes(1)),
        waitFor(() => expect(timerCallback).toHaveBeenCalledTimes(1)),
    ])
}

export default flush
/**
 * Run code in returned callback.
 */
declare function useCallbackAfterRender(): Callback;
declare type Callback = (callback: () => void) => void;
export default useCallbackAfterRender;

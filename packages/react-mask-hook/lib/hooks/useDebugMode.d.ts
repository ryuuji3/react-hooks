declare function useDebugMode(debug: boolean, values: DebugModeValues): {
    log: Logger;
};
declare enum LogLevel {
    INFO = "log",
    WARN = "warn",
    ERROR = "error"
}
declare type Logger = (message: string, level?: LogLevel) => void;
interface DebugModeValues {
    mask: string | Array<String | RegExp>;
    placeholder: string;
    value: string;
    maskedValue: string;
}
export default useDebugMode;
export type { LogLevel, Logger, };

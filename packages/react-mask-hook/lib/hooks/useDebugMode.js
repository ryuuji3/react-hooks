"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useDebugMode(debug, values) {
    var hasDisplayedDebugInfo = react_1.useRef(false);
    // Add debugging in inspector
    react_1.useDebugValue(debug && values);
    if (debug && hasDisplayedDebugInfo.current === false) {
        console.log(displayDebugInfo(values));
        hasDisplayedDebugInfo.current = true;
    }
    return {
        log: log(debug),
    };
}
function getMask(mask) {
    return typeof mask === 'string'
        ? "\"" + mask + "\""
        : mask.join(',');
}
function displayDebugInfo(values) {
    return ("useMask Debug Info:\n\nMask: " + getMask(values.mask) + "\nDisplay Mask: \"" + values.placeholder + "\"\n");
}
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "log";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel || (LogLevel = {}));
function log(debug) {
    return function (message, level) {
        if (level === void 0) { level = LogLevel.INFO; }
        if (!debug) {
            return;
        }
        switch (level) {
            case LogLevel.WARN:
                console.warn(message);
                break;
            case LogLevel.ERROR:
                console.error(message);
                break;
            case LogLevel.INFO:
            default:
                console.log(message);
                break;
        }
    };
}
exports.default = useDebugMode;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Run code in returned callback.
 */
function useCallbackAfterRender() {
    var lastRun = react_1.useRef(null);
    react_1.useLayoutEffect(function () {
        var _a;
        (_a = lastRun.current) === null || _a === void 0 ? void 0 : _a.call(lastRun);
        lastRun.current = null;
    });
    return function (callback) {
        lastRun.current = callback; // schedule callback after render
    };
}
exports.default = useCallbackAfterRender;

"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMask = void 0;
var react_1 = require("react");
var useCallbackAfterRender_1 = __importDefault(require("./useCallbackAfterRender"));
var getMaskedValue_1 = __importDefault(require("../functions/getMaskedValue"));
var getNextCursorPosition_1 = __importDefault(require("../functions/getNextCursorPosition"));
var useDebugMode_1 = __importDefault(require("./useDebugMode"));
var convertStringMaskToRegexp_1 = __importDefault(require("../functions/convertStringMaskToRegexp"));
var getPlaceholderFromMask_1 = __importDefault(require("../functions/getPlaceholderFromMask"));
var getNewValue_1 = __importDefault(require("../functions/getNewValue"));
/**
 *
 * @param value
 * @param onChange
 * @param mask
 * @param displayMask
 */
function useMask(_a) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, onChange = _a.onChange, _c = _a.debug, debug = _c === void 0 ? false : _c, props = __rest(_a, ["value", "onChange", "debug"]);
    var mask = react_1.useMemo(function () { return convertStringMaskToRegexp_1.default(props.mask); }, [props.mask]);
    var placeholder = react_1.useMemo(function () { return getPlaceholderFromMask_1.default(mask, props.placeholder); }, [mask, props.placeholder]);
    var maskedValue = getMaskedValue_1.default(value, mask, placeholder);
    var log = useDebugMode_1.default(debug, {
        mask: mask,
        placeholder: placeholder,
        value: value,
        maskedValue: maskedValue,
    }).log;
    var lastCursorPosition = getNextCursorPosition_1.default(value, mask, log);
    var scheduleAfterRender = useCallbackAfterRender_1.default();
    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange(_a) {
        var target = _a.target;
        var newValue = getNewValue_1.default({
            inputValue: target.value,
            maskedValue: maskedValue,
            oldValue: value,
            mask: mask,
            lastCursorPosition: lastCursorPosition,
            log: log,
        });
        onChange(newValue);
        // onChange is asynchronous so update cursor after it re-renders
        scheduleAfterRender(function () {
            setCursorPositionForElement(target, getNextCursorPosition_1.default(newValue, mask, log));
        });
    }
    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp(_a) {
        var target = _a.target;
        setCursorPositionForElement(target, lastCursorPosition);
    }
    function onKeyDown(_a) {
        var target = _a.target;
        // make sure cursor is positioned correctly before input happens
        // or else the character might not be in the right position
        setCursorPositionForElement(target, lastCursorPosition);
    }
    function onFocus(_a) {
        var target = _a.target;
        // Work around in chrome to make sure focus sets cursor position
        requestAnimationFrame(function () {
            setCursorPositionForElement(target, getNextCursorPosition_1.default(target.value, mask, log));
        });
    }
    return {
        'data-value': value.length ? value : undefined,
        value: value.length ? maskedValue : '',
        placeholder: placeholder,
        onChange: handleChange,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp,
        onFocus: onFocus,
    };
}
exports.useMask = useMask;
/**
 *
 * @param element
 * @param cursorPosition
 */
function setCursorPositionForElement(element, cursorPosition) {
    element === null || element === void 0 ? void 0 : element.setSelectionRange(cursorPosition, cursorPosition, 'forward');
}
exports.default = useMask;

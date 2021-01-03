"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculate the new value using existing value, new value, mask and cursor position.
 *
 * TODO: This sucks. How do I make it not suck?
 *
 * @param inputValue
 * @param oldValue
 * @param maskedValue
 * @param mask
 * @param lastCursorPosition
 * @param log
 */
function getNewValue(_a) {
    var inputValue = _a.inputValue, oldValue = _a.oldValue, maskedValue = _a.maskedValue, mask = _a.mask, lastCursorPosition = _a.lastCursorPosition, log = _a.log;
    var newValue;
    if (inputValue.length > maskedValue.length) {
        var maskCharacterOrPattern = mask[lastCursorPosition];
        var insertedCharacter = inputValue.charAt(lastCursorPosition);
        if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
            newValue = "" + oldValue + insertedCharacter;
            log("[useMask] inserted character: " + insertedCharacter);
        }
        else {
            newValue = oldValue; // ignore
            log("[useMask] ignored character: " + insertedCharacter);
        }
    }
    else {
        if (oldValue.length === 0) {
            var maskCharacterOrPattern = mask[lastCursorPosition];
            var insertedCharacter = inputValue.charAt(0);
            if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
                newValue = insertedCharacter;
                log("[useMask] inserted character: " + insertedCharacter);
            }
            else {
                newValue = oldValue; // ignore
                log("[useMask] ignored character: " + insertedCharacter);
            }
        }
        else {
            newValue = oldValue.slice(0, oldValue.length - 1); // Remove a character
            log("[useMask] removed character");
        }
    }
    return newValue;
}
exports.default = getNewValue;

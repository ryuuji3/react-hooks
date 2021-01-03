"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fitInputValueIntoMask_1 = __importDefault(require("./fitInputValueIntoMask"));
/**
 * Assuming that any patterns that haven't been replaced with a value have not been fulfilled,
 * replace the leftover patterns with their placeholder character.
 *
 * @param value
 * @param mask
 * @param placeholder exact length string
 */
function getMaskedValue(value, mask, placeholder) {
    var maskedValue = fitInputValueIntoMask_1.default(value, mask);
    return maskedValue.reduce(function (result, characterOrPattern, characterIndex) {
        if (characterOrPattern instanceof RegExp) {
            result[characterIndex] = placeholder.charAt(characterIndex);
        }
        return result;
    }, maskedValue).join('');
}
exports.default = getMaskedValue;

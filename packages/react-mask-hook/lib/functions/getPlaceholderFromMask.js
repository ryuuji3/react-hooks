"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * If placeholder is only one character, then swap all regular expressions with the character.
 * Otherwise just use the placeholder as is.
 *
 * @param mask
 * @param placeholder
 */
function getPlaceholderFromMask(mask, placeholder) {
    if (placeholder.length === 1) {
        return mask.reduce(function (result, maskCharacterOrPattern, index) {
            if (maskCharacterOrPattern instanceof RegExp) {
                result[index] = placeholder;
            }
            return result;
        }, __spreadArrays(mask)).join('');
    }
    else {
        return placeholder;
    }
}
exports.default = getPlaceholderFromMask;

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
 * Return partial mask with patterns replaced by values.
 *
 * @param value
 * @param mask
 */
function fitInputValueIntoMask(value, mask) {
    var valueCharacters = value.split('');
    var abort = false;
    return valueCharacters.reduce(function (outputMask, currentCharacter) {
        if (abort) { // If we failed a match then don't attempt to place characters into mask.
            return outputMask;
        }
        var firstMaskPattern = findFirstPattern(outputMask);
        if (firstMaskPattern === null || firstMaskPattern === void 0 ? void 0 : firstMaskPattern.test(currentCharacter)) {
            outputMask[outputMask.indexOf(firstMaskPattern)] = currentCharacter;
        }
        else {
            abort = true;
        }
        return outputMask;
    }, __spreadArrays(mask));
}
function findFirstPattern(mask) {
    // TypeScript isn't smart enough to realize that this MUST be a RegExp or null, and can never be string.
    return mask.find(function (characterOrPattern) { return characterOrPattern instanceof RegExp; });
}
exports.default = fitInputValueIntoMask;

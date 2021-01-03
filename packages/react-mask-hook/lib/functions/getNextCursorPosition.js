"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fitInputValueIntoMask_1 = __importDefault(require("./fitInputValueIntoMask"));
/**
 *
 * @param value
 * @param mask
 */
function getNextCursorPosition(value, mask, log) {
    var maskedValue = fitInputValueIntoMask_1.default(value, mask);
    // The first pattern is one that can't be replaced so we'll position our cursor there.
    var nextPlaceholder = maskedValue.findIndex(function (characterOrPattern) { return characterOrPattern instanceof RegExp; });
    log("Cursor position calculated at " + nextPlaceholder);
    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length;
}
exports.default = getNextCursorPosition;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * If necessary, we'll convert from old format to new one using this helper.
 *
 * @param mask
 */
function parseMask(mask) {
    if (typeof mask === 'string') {
        return convertStringMaskToRegExpMask(mask);
    }
    else {
        return mask; // it's already the correct format
    }
}
function convertStringMaskToRegExpMask(mask) {
    var characters = mask.split('');
    return characters.reduce(function (maskCharacters, character, currentCharacterIndex) {
        if (/#/.test(character)) {
            maskCharacters[currentCharacterIndex] = /\d/;
        }
        return maskCharacters;
    }, characters);
}
exports.default = parseMask;

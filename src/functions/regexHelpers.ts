/**
 * 
 * @param value 
 */
function getNumbersFromMaskedValue(value: string): string {
    return value
        .replace(/[^\d]/g, '') // remove non numbers
}

/**
 * 
 * @param mask 
 */
function getMaskFromMaskedValue(mask: string): string {
    return mask
        .replace(/[^#]/g, '') // remove non mask characters
}

export {
    getNumbersFromMaskedValue,
    getMaskFromMaskedValue,
}
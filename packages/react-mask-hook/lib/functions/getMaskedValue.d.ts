import { Mask } from '../hooks/useMask';
/**
 * Assuming that any patterns that haven't been replaced with a value have not been fulfilled,
 * replace the leftover patterns with their placeholder character.
 *
 * @param value
 * @param mask
 * @param placeholder exact length string
 */
declare function getMaskedValue(value: string, mask: Mask, placeholder: string): string;
export default getMaskedValue;

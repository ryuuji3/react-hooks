import { Mask } from '../hooks/useMask';
/**
 * If placeholder is only one character, then swap all regular expressions with the character.
 * Otherwise just use the placeholder as is.
 *
 * @param mask
 * @param placeholder
 */
export default function getPlaceholderFromMask(mask: Mask, placeholder: string): string;

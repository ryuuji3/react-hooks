import { Logger } from "../hooks/useDebugMode";
import { Mask } from "../hooks/useMask";
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
declare function getNewValue({ inputValue, oldValue, maskedValue, mask, lastCursorPosition, log, }: GetNewValueParams): string;
interface GetNewValueParams {
    inputValue: string;
    oldValue: string;
    maskedValue: string;
    mask: Mask;
    lastCursorPosition: number;
    log: Logger;
}
export default getNewValue;

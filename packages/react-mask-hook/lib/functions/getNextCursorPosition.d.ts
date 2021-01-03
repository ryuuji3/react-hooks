import { Mask } from '../hooks/useMask';
import { Logger } from '../hooks/useDebugMode';
/**
 *
 * @param value
 * @param mask
 */
declare function getNextCursorPosition(value: string, mask: Mask, log: Logger): number;
export default getNextCursorPosition;

import { Mask } from '../hooks/useMask';
/**
 * If necessary, we'll convert from old format to new one using this helper.
 *
 * @param mask
 */
declare function parseMask(mask: string | Mask): Mask;
export default parseMask;

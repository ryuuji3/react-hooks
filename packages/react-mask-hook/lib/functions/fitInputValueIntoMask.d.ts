import { Mask } from '../hooks/useMask';
/**
 * Return partial mask with patterns replaced by values.
 *
 * @param value
 * @param mask
 */
declare function fitInputValueIntoMask(value: string, mask: Mask): Mask;
export default fitInputValueIntoMask;

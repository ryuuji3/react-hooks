import { KeyboardEvent, ChangeEvent, FocusEvent } from 'react';
/**
 *
 * @param value
 * @param onChange
 * @param mask
 * @param displayMask
 */
export declare function useMask({ value, onChange, debug, ...props }: MaskProps): InputProps;
/**
 * Props you need to pass to useMask()
 */
interface MaskProps {
    value: string;
    onChange: (value: string) => void;
    mask: string | Mask;
    placeholder: string;
    debug?: boolean;
}
/**
 * Props you need to spread onto your input.
 */
interface InputProps {
    'data-value'?: string;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
    onFocus: (e: FocusEvent<HTMLInputElement>) => void;
}
declare type Mask = Array<string | RegExp>;
export default useMask;
export type { MaskProps, Mask, InputProps, };

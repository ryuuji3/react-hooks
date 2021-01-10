import { ChangeEvent } from 'react'

import formatNumber from '../functions/formatNumber'
import parseValue from '../functions/parseValue'


function useFormattedNumber({
    value,
    onChange,
}: FormattedNumberProps): InputProps {
    const formattedValue = formatNumber(value)

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        const newValue = parseValue(target.value)

        onChange(newValue ?? value as number) // value will always be a number
    }
    
    return {
        value: formattedValue,
        onChange: handleChange,
    }
}

interface FormattedNumberProps {
    value: number | string | null
    onChange: (value: number | null) => void
}

interface InputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default useFormattedNumber
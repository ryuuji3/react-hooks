import { ChangeEvent } from 'react'


function useFormattedNumber({
    value,
    onChange,
}: FormattedNumberProps): InputProps {
    const formattedValue = value.toString()

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        const newValue = parseFloat(target.value)

        onChange(newValue)
    }
    
    return {
        value: formattedValue.length ? formattedValue : '',
        onChange: handleChange,
    }
}

interface FormattedNumberProps {
    value: number
    onChange: (value: number) => void
}

interface InputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default useFormattedNumber
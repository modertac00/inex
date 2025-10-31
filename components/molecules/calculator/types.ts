export type ButtonType = {
    label : string ;
    type: 'number' | 'operator' | 'decimal' | 'clear';
}

export type CalculatorButton = {
    onSubmit: (value: string) => void;
}
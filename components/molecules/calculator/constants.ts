import { ButtonType } from "./types";

export const BUTTONS_FIRST_SET: ButtonType[] = [
    {
        label: "1",
        type: "number"
    },
    {
        label: "2",
        type: "number"
    },
    {
        label: "3",
        type: "number"
    },
    {
        label: "+",
        type: "operator"
    }
]

export const BUTTONS_SECOND_SET: ButtonType[] = [
    {
        label: "4",
        type: "number"
    },
    {
        label: "5",
        type: "number"
    },  
    {
        label: "6",
        type: "number"
    },
    {
        label: "-",
        type: "operator"
    }
]

export const BUTTONS_THIRD_SET: ButtonType[] = [
    {
        label: "7",
        type: "number"
    },
    {
        label: "8",
        type: "number"
    },  
    {
        label: "9",
        type: "number"
    },
    {
        label: "*",
        type: "operator"
    }
]     

export const BUTTONS_FOURTH_SET: ButtonType[] = [
    {
        label: "0",
        type: "number"
    },
    {
        label: ".",
        type: "decimal"
    },  
    {
        label: "⌫",
        type: "clear"
    },
    {
        label: "/",
        type: "operator"
    }
]

export const BUTTON_ROWS : ButtonType[][] = [
    BUTTONS_FIRST_SET,
    BUTTONS_SECOND_SET,
    BUTTONS_THIRD_SET,
    BUTTONS_FOURTH_SET
];
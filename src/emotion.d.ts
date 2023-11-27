import '@emotion/react'
import { sky, gray, skyDark, grayDark } from '@radix-ui/colors';


export type NumberIndex = {
    '1': string
    '2': string
    '3': string
    '4': string
    '5': string
    '6': string
    '7': string
    '8': string
    '9': string
    '10': string
    '11': string
    '12': string
}

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            accent: NumberIndex
            neutral: NumberIndex
        },
    }
}
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    fontFamily: `'Inter', sans-serif`,
    colors: {
        black: '#0E0E0E',
        blackHover: '#262626',
        white: '#F5F5F7',
        whiteHover: '#E2E2E2',
    },
    boxStyles: (zIndex: number) => `
        box-shadow: 0px ${zIndex*2}px ${zIndex*2}px 0px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    `,
    textStyles: `
        font-family: 'Inter', sans-serif;
        color: #CCCCCC;
        font-size: 13px;
    `,
    zIndex: {
        canvas: 1,
        pixiContainer: 2,
        domContainer: 3,
        interface: 4
    }
}
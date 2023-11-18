

// import original module declarations
import 'styled-components';

type ColorSet = {
    black: string,
    blackHover: string,
    white: string,
    whiteHover: string
}
 
// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        fontFamily: string,
        colors: ColorSet,
        boxStyles: (zIndex: number) => string
        textStyles: string
        zIndex: {
            canvas: number,
            pixiContainer: number,
            domContainer: number,
            interface: number
        }
    }
}


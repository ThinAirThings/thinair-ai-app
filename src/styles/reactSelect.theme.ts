import { Theme } from "react-select";
import * as designTokens from '../style-dictionary-dist/variables.js'

export const reactSelectTheme = (theme: Theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: designTokens.PrimitivesColorsPrimary400,
        primary25: designTokens.PrimitivesColorsPrimary50,
        primary50: designTokens.PrimitivesColorsPrimary200,
        primary75: designTokens.PrimitivesColorsPrimary300,
    }
})


export const reactSelectStyles = {
    theme: reactSelectTheme,
    styles: {
        container: (provided: any) => ({
            ...provided,
            width: '100%',
            borderColor: designTokens.PrimitivesColorsInputBorder,
        }),
    }
}
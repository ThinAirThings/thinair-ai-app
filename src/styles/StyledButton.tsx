import * as designTokens from '../style-dictionary-dist/variables' 
import styled from "@emotion/styled"


type ButtonStyle = {
    color: 'primary' | 'white' | 'black' | 'red' | 'green'
}

export const StyledButton = styled.button<ButtonStyle>({
    // Layout
    display: 'inline-flex',
    padding: '7px 10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    // Style
    borderRadius: '5px',
    // Font
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
}, ({color}) => color === "black" ? ({
    color: designTokens.PrimitivesColorsWhite,
    backgroundColor: designTokens.PrimitivesColorsBlack,
    '&:hover': {
        backgroundColor: designTokens.PrimitivesColorsBlackhover
    }
}) : color === "white" ? ({
    color: designTokens.PrimitivesColorsBlack,
    backgroundColor: designTokens.PrimitivesColorsWhite,
    '&:hover': {
        backgroundColor: designTokens.PrimitivesColorsWhitehover
    }
})  : color === 'red' ? ({
    color: designTokens.PrimitivesColorsOnPrimary,
    backgroundColor: designTokens.PrimitivesColorsRed500,
    '&:hover': {
        backgroundColor: designTokens.PrimitivesColorsRed600
    }
})  : color === 'green' ? ({
    color: designTokens.PrimitivesColorsOnPrimary,
    backgroundColor: designTokens.PrimitivesColorsGreen500,
    '&:hover': {
        backgroundColor: designTokens.PrimitivesColorsGreen400
    }
}) :({
    color: designTokens.PrimitivesColorsOnPrimary,
    backgroundColor: designTokens.PrimitivesColorsPrimary500,
    '&:hover': {
        backgroundColor: designTokens.PrimitivesColorsPrimary400
    }
}))

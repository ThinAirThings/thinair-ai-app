import * as designTokens from '../style-dictionary-dist/variables' 
import styled from "@emotion/styled"


type ButtonStyle = {
    color: 'primary' | 'white' | 'black'
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
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
}, ({color}) => color === "black" ? ({
    color: designTokens.ColorsWhite,
    backgroundColor: designTokens.ColorsBlack,
    '&:hover': {
        backgroundColor: designTokens.ColorsBlackhover
    }
}) : color === "white" ? ({
    color: designTokens.ColorsBlack,
    backgroundColor: designTokens.ColorsWhite,
    '&:hover': {
        backgroundColor: designTokens.ColorsWhitehover
    }
}) : ({
    color: designTokens.ColorsOnPrimary,
    backgroundColor: designTokens.ColorsPrimary500,
    '&:hover': {
        backgroundColor: designTokens.ColorsPrimary400
    }
}))

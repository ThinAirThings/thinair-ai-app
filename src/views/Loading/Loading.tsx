import styled from "@emotion/styled"
import * as designTokens from "../../style-dictionary-dist/variables"


export const Loading = () => {
    return (
        <StyledLoading>
            <span/>
            <img src="/assets/logos/thinair-white.svg"/>
        </StyledLoading>
    )
}


const StyledLoading = styled.div`
    // Layout
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;

    // Style
    background-color: ${designTokens.PrimitivesColorsBlack};
    >span {
        // Layout
        width: 170px;
        height: 170px;
        border: 4px solid ${designTokens.PrimitivesColorsWhite};
        border-bottom-color: transparent;
        border-radius: 50%;
        animation: rotation 1s linear infinite;
        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
    >img {
        position: absolute;
        width: 86px;
        height: auto;
        transform: translate(-10px, -10px);
    }
`
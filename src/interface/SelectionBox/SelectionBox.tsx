import { absoluteStateToScreenState } from "@thinairthings/zoom-utils"
import { useSelfAbsoluteSelectionBounds } from "../DomViewportTarget/hooks/useSelfAbsoluteSelectionBounds"
import { useViewportState } from "../ViewportState/ViewportStateContext"
import { FC } from "react"
import styled from "styled-components"


export const SelectionBox: FC = () => {
    const [absoluteSelectionBounds] = useSelfAbsoluteSelectionBounds()
    const [viewportState] = useViewportState()
    const screenStateSelectionBounds = absoluteSelectionBounds
        && absoluteStateToScreenState(viewportState, absoluteSelectionBounds)
    return <>
        {screenStateSelectionBounds &&
             <StyledSelectionBox
                style={{
                    left: screenStateSelectionBounds.x,
                    top: screenStateSelectionBounds.y,
                    width: screenStateSelectionBounds.width,
                    height: screenStateSelectionBounds.height
                }}
            />
        }
    </>
}

const StyledSelectionBox = styled.div`
    // Control
    pointer-events: none;
    // Layout
    position: absolute;
    // Style
    border-radius: 2px;
    border: 1px solid #D2D2D2;
    background: rgba(165, 165, 165, 0.50);
`
import { FC, useMemo } from "react";
import { useViewportState } from "../ViewportState/ViewportStateContext";
import { useNodeSet, useSelfNodeKeySelection } from "../../air-systems/AirStorage.configure";
import { getSelectionBoundingBox } from "@thinairthings/zoom-utils";
import styled from "styled-components";
import { TransformZone, transformTargetTypes } from "../TransformZone/TransformZone";



export const SelectionBoundingBox: FC = () => {
    const [viewportState] = useViewportState()
    const nodeKeySelection = useSelfNodeKeySelection()
    const selectedContainerStateMap = useNodeSet(liveIndex => new Map([...liveIndex.values()]
        .filter(node => nodeKeySelection.some(nodeKey => node.nodeId === nodeKey.nodeId))
        .map(node => [node.nodeId, node.state.containerState])
    ))
    const boxBounds = useMemo(() => selectedContainerStateMap.size > 0
        ? getSelectionBoundingBox(viewportState, [...selectedContainerStateMap].map(([_, containerState]) => containerState))
        : null, [selectedContainerStateMap, viewportState])
    
    return (
        <>
            {boxBounds && <StyledSelectionBoundingBox
                style={{
                    left: boxBounds?.x,
                    top: boxBounds?.y,
                    width: boxBounds?.width,
                    height: boxBounds?.height,
                    outlineOffset: 5*1/viewportState.scale
                }}  
            />}
            {boxBounds && transformTargetTypes.map(transformTargetType => (
                <TransformZone
                    key={transformTargetType}
                    transformTargetType={transformTargetType}
                    boxBounds={boxBounds}
                />
            ))}
        </>
    )
}

const StyledSelectionBoundingBox = styled.div`
    // Control
    pointer-events: none;
    // Layout
    position: absolute;
    // Style
    border-radius: 5px;
    border: 2px solid #3DDF8C;
`
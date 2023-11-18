import { useRenderedRef } from "@thinairthings/react-utils";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { useWheelZoom } from "./hooks/useWheelZoom";
import { useViewportRightClick } from "./hooks/useViewportRightClick";
import { usePointerViewportSelection } from "./hooks/usePointerViewportSelection";

export const DomViewportTarget: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    // Refs
    const pointerTargetRef = useRenderedRef<HTMLDivElement>()
    // Hooks
    useWheelZoom(pointerTargetRef.current)
    useViewportRightClick(pointerTargetRef.current)
    usePointerViewportSelection(pointerTargetRef.current)
    return (
        <PointerTarget ref={pointerTargetRef}>
            {children} 
        </PointerTarget>
    )
}

const PointerTarget = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`
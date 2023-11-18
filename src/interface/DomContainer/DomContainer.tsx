import { NodeKey } from "@thinairthings/air-storage";
import { FC, ReactNode } from "react";
import {  U, useSelectNodeState } from "../../air-systems/AirStorage.configure";
import styled from "styled-components";
import { useRenderedRef } from "@thinairthings/react-utils";
import { usePointerSelection } from "./hooks/usePointerSelection";


export const DomContainer: FC<{
    nodeKey: NodeKey<U>
    children?: ReactNode
}> = ({
    nodeKey,
    children
}) => {
    // Refs
    const containerRef = useRenderedRef<HTMLDivElement>()
    // State
    const containerState = useSelectNodeState(nodeKey, state => state.containerState)
    // Effects
    usePointerSelection(nodeKey, containerRef.current)
    return (
        <Container ref={containerRef}
             style={{
                 width: (1/containerState.scale) * containerState.width,
                 height: (1/containerState.scale) * containerState.height,
                 transform: `
                     translate(
                         ${containerState.x}px, 
                         ${containerState.y}px
                     )
                     scale(${containerState.scale})
                 `
             }}
        >
             {children}
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    transform-origin: top left;
    outline: 1px solid red;
`
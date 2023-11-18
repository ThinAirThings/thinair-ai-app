import { FC, ReactNode, Suspense, createContext, useContext, useRef } from "react";
import styled from "styled-components";
import { RoomContext,  U,  createNodeKey,  useNodeSet, useRoom } from "../../air-systems/AirStorage.configure";
import { useViewportState } from "../ViewportState/ViewportStateContext";
import { StaticIndex } from "../../air-systems/StaticIndex";


const ReferencePointContext = createContext<{
    domReferencePoint: HTMLDivElement
}>(null as any);

export const useDomReferencePoint = () => useContext(ReferencePointContext).domReferencePoint

export const DomReferencePoint: FC = () => {
    // Refs
    const referencePointRef = useRef<HTMLDivElement>(null)
    // State
    const [viewportState] = useViewportState()
    const containerNodeKeys = useNodeSet((liveIndex) => [...liveIndex.values()]
        .filter(node => (!!node.state.containerState) && node.parentNodeId === null)
        .map(node => createNodeKey(node))
    )
    // Hooks
    return (
        <ReferencePointContext.Provider value={{
            domReferencePoint: referencePointRef.current!
        }}>
            <ReferencePoint ref={referencePointRef}
                style={{
                    transform: `
                        scale(${1/viewportState.scale})
                        translate(${viewportState.x}px, ${viewportState.y}px)
                    `
                }}
            >
                {containerNodeKeys.map(nodeKey => {
                    const Component = StaticIndex.get(nodeKey.type).Component as FC<{nodeKey: ReturnType<typeof createNodeKey>}>
                    return <Component
                        key={nodeKey.nodeId}
                        nodeKey={nodeKey}
                    />
                })}
            </ReferencePoint>
        </ReferencePointContext.Provider>
    )
}

const ReferencePoint = styled.div`
    position: absolute;
    top: 0px;
    transform-origin: top left;
`
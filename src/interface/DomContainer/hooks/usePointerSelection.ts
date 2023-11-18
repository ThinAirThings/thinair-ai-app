import { useEffect } from "react"
import { U, createNodeKey, useNodeSet, useSelfNodeKeySelection, useSelfNodeKeySelectionUpdate, useUpdateNodeState } from "../../../air-systems/AirStorage.configure"
import { NodeKey } from "@thinairthings/air-storage"
import { fromEvent, takeUntil } from "rxjs"
import { mousePoint } from "@thinairthings/mouse-utils"
import { ContainerState } from "@thinairthings/zoom-utils"
import { useViewportState } from "../../ViewportState/ViewportStateContext"


export const usePointerSelection = (
    nodeKey: NodeKey<U>,
    pointerTarget: HTMLDivElement | null
) => {
    // State
    const [viewportState] = useViewportState()
    const nodeKeySelection = useSelfNodeKeySelection()
    const allContainerStatesMap = useNodeSet(liveIndex => new Map([...liveIndex.values()]
        .map(node => [node.nodeId, {
            nodeKey: createNodeKey(node),
            containerState: node.state.containerState
        }])
    ))
    const updateNodeState = useUpdateNodeState()
    const updateNodeKeySelection = useSelfNodeKeySelectionUpdate()
    // // Effect
    useEffect(() => {
        if (!pointerTarget) return
        const subscription = fromEvent<PointerEvent>(pointerTarget, 'pointerdown')
        .subscribe(event => {
            // Guards
            if (event.button !== 0) return
            event.stopPropagation()
            // If the shift key is not pressed, clear the selection
            if ((!event.shiftKey)&&(nodeKeySelection.length < 2)) {
                nodeKeySelection.length = 0
                updateNodeKeySelection(() => [])
            } 
            // If the node is not selected, select it
            if (!nodeKeySelection.some(selectedNodeKey => selectedNodeKey.nodeId === nodeKey.nodeId)) {
                updateNodeKeySelection((nodeKeySelection) => [...nodeKeySelection, nodeKey])
                nodeKeySelection.push(nodeKey)
            }
            // Setup 
            const pointerDownPoint = mousePoint(event)
            const initialContainerStatesMap = new Map([...allContainerStatesMap]
                .filter(([nodeId]) => nodeKeySelection.some(selectedNodeKey => selectedNodeKey.nodeId === nodeId))
            )
            let finalContainerStatesMap: Map<string, { nodeKey: NodeKey<U>, containerState: ContainerState }>
            document.body.setPointerCapture(event.pointerId)

            // Pointer Move
            fromEvent<PointerEvent>(document.body, 'pointermove')
            .pipe(
                takeUntil(fromEvent<PointerEvent, void>(document.body, 'pointerup', {}, event => {
                    document.body.releasePointerCapture(event.pointerId)
                    // If Alt Key, Duplicate
                }))
            )
            .subscribe(event => {
                const pointerMovePoint = mousePoint(event)
                // Calculate Final Container States
                finalContainerStatesMap = new Map([...initialContainerStatesMap]
                    .map(([nodeId, { nodeKey, containerState }]) => 
                        [nodeId, {
                            nodeKey,
                            containerState: {
                                ...containerState,
                                x: containerState.x + viewportState.scale * (pointerMovePoint.x - pointerDownPoint.x),
                                y: containerState.y + viewportState.scale * (pointerMovePoint.y - pointerDownPoint.y)
                            }
                        }]
                    )
                );
                // Update Container States
                [...finalContainerStatesMap.values()]
                .forEach(({ nodeKey, containerState }) => updateNodeState(nodeKey, nodeState => 
                    nodeState.get('containerState').update(containerState)   
                ))        
            })
        })
        return () => subscription.unsubscribe()
    }, [
        pointerTarget, 
        nodeKeySelection,
        viewportState, 
        allContainerStatesMap
    ])
}
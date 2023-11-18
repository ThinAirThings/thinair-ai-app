import { useEffect } from "react"
import { useNodeSet, useSelfNodeKeySelection, useSelfNodeKeySelectionUpdate } from "../../../air-systems/AirStorage.configure"
import { useViewportState } from "../../ViewportState/ViewportStateContext"
import { fromEvent, takeUntil } from "rxjs"
import { mousePoint, mouseRect } from "@thinairthings/mouse-utils"
import { useSelfAbsoluteSelectionBounds } from "./useSelfAbsoluteSelectionBounds"
import { ContainerState, ScreenState, screenStateToAbsoluteState } from "@thinairthings/zoom-utils"



export const usePointerViewportSelection = (pointerTarget: HTMLDivElement | null) => {
    // State
    const nodeKeySelection = useSelfNodeKeySelection()
    const updateNodeKeySelection = useSelfNodeKeySelectionUpdate()
    const [viewportState] = useViewportState()
    const [_, updateAbsoluteSelectionBounds] = useSelfAbsoluteSelectionBounds()
    const containerNodeSet = useNodeSet(liveIndex => [...liveIndex.values()]
        .filter(node => !!node.state.containerState)
        .map(node => node)
    )
    // Effect
    useEffect(() => {
        if (!pointerTarget) return
        const subscription = fromEvent<PointerEvent>(pointerTarget, 'pointerdown')
        .subscribe((event) => {
            // Guards
            if (event.button !== 0) return
            // If the shift key is not pressed, clear the selection
            if ((!event.shiftKey)) {
                nodeKeySelection.length = 0
                updateNodeKeySelection(() => [])
            } 
            const initialNodeKeySelection = [...nodeKeySelection]
            const pointerDownPoint = mousePoint(event)
            document.body.setPointerCapture(event.pointerId)
            fromEvent<PointerEvent>(window, 'pointermove')
            .pipe(
                takeUntil(
                    fromEvent<PointerEvent, void>(window, 'pointerup', {}, (event) => {
                        updateAbsoluteSelectionBounds(null)
                        document.body.releasePointerCapture(event.pointerId)
                    })
                )
            )
            .subscribe((event) => {
                const pointerMovePoint = mousePoint(event)
                const absoluteSelectionBounds = screenStateToAbsoluteState(viewportState, mouseRect(pointerDownPoint, pointerMovePoint))
                updateAbsoluteSelectionBounds(absoluteSelectionBounds)
                // Update selection
                const nodeKeysWithinSelectionBounds = containerNodeSet.filter(
                    node => isNodeInSelectionBounds(absoluteSelectionBounds, node.state.containerState)
                )
                // Get the nodes that are outside the selection bounds but were previously selected due to shift key
                const nodesToAddBack = initialNodeKeySelection.filter(initialNodeKey => 
                    !nodeKeysWithinSelectionBounds.some(inBoundsNodeKey => inBoundsNodeKey.nodeId === initialNodeKey.nodeId)
                )
                // Remove the nodes that were in the selection bounds but were previously selected due to shift key
                const nodeKeysWithinSelectionBoundsFiltered = nodeKeysWithinSelectionBounds.filter(inBoundsNodeKey => 
                    !initialNodeKeySelection.some(initialNodeKey => initialNodeKey.nodeId === inBoundsNodeKey.nodeId)
                )
                // Update the selection
                updateNodeKeySelection(() => [...nodeKeysWithinSelectionBoundsFiltered, ...nodesToAddBack])
            })
        })
        return () => subscription.unsubscribe()
    }, [pointerTarget, viewportState, nodeKeySelection, containerNodeSet])
}

const isNodeInSelectionBounds = (selectionBounds: ScreenState, containerState: ContainerState) => {
    return !(selectionBounds.x > containerState.x + containerState.width ||
             selectionBounds.x + selectionBounds.width < containerState.x ||
             selectionBounds.y > containerState.y + containerState.height ||
             selectionBounds.y + selectionBounds.height < containerState.y)
}
import { useEffect } from "react"
import { fromEvent, takeUntil } from "rxjs"
import { useViewportState } from "../../ViewportState/ViewportStateContext"
import { mouseDistance, mousePoint } from "@thinairthings/mouse-utils"
import { useCreateRightClickMenu } from "../../RightClickMenu/RightClickMenu"
import { Point } from "@thinairthings/zoom-utils"
import { ViewportTargetRightClickMenu } from "../ViewportTargetRightClickMenu"



export const useViewportRightClick = (pointerTarget: HTMLDivElement | null) => {
    // State
    const [viewportState, updateViewportState] = useViewportState()
    const createRightClickMenu = useCreateRightClickMenu()

    // Effect
    useEffect(() => {
        if (!pointerTarget) return
        const subscription = fromEvent<PointerEvent>(pointerTarget, 'pointerdown')
        .subscribe((event) => {
            // Guards
            if (event.button !== 2) return
            // Set Constants
            const pointerDownPoint = mousePoint(event)
            let pointerMovePoint: Point
            const initialViewportState = {...viewportState}
            fromEvent<PointerEvent>(window, 'pointermove')
            .pipe(
                takeUntil(fromEvent<PointerEvent, void>(window, 'pointerup', {}, event => {
                    if (mouseDistance(pointerDownPoint, mousePoint(event)) > 5) return
                    event.preventDefault()
                    createRightClickMenu(event, () => <ViewportTargetRightClickMenu/>)
                }))
            )
            .subscribe((event) => {
                pointerMovePoint = mousePoint(event)
                updateViewportState({
                    ...initialViewportState,
                    x: initialViewportState.x + viewportState.scale * (pointerMovePoint.x - pointerDownPoint.x),
                    y: initialViewportState.y + viewportState.scale * (pointerMovePoint.y - pointerDownPoint.y),
                })
            })
        })
        return () => subscription.unsubscribe()
    }, [pointerTarget, viewportState])
}



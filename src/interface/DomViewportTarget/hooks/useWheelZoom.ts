import { useEffect } from "react"
import { useViewportState } from "../../ViewportState/ViewportStateContext"
import { fromEvent } from "rxjs"
import { mousePoint } from "@thinairthings/mouse-utils"


export const useWheelZoom = (pointerTarget: HTMLDivElement | null) => {
    // State
    const [viewportState, updateViewportState] = useViewportState()
    // Effect
    useEffect(() => {
        if (!pointerTarget) return
        const subscription = fromEvent<WheelEvent>(pointerTarget, 'wheel')
        .subscribe((event) => {
            if (event.altKey) return    // Application Zoom owns this
            // Get zoom direction
            let direction: -1 | 1
            event.deltaY < 0 ? (direction = -1) : (direction = 1)
            const viewportBoxScaleFactor = 1 + (0.15*direction);
            const screenDims = [window.innerWidth, window.innerHeight]
            const dAbsoluteViewportDims = screenDims.map(dim => viewportState.scale*dim*(viewportBoxScaleFactor - 1))
            updateViewportState({
                x: viewportState.x + dAbsoluteViewportDims[0]*(mousePoint(event).x/screenDims[0]),
                y: viewportState.y + dAbsoluteViewportDims[1]*(mousePoint(event).y/screenDims[1]),
                scale: viewportState.scale*viewportBoxScaleFactor
            })
        })
        return () => subscription.unsubscribe()
    }, [pointerTarget, viewportState])
}
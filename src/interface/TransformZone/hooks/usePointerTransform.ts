import { useEffect } from "react"
import { createNodeKey, useNodeSet, useSelfNodeKeySelection, useUpdateNodeState } from "../../../air-systems/AirStorage.configure"
import { useViewportState } from "../../ViewportState/ViewportStateContext"
import { fromEvent, takeUntil } from "rxjs"
import { TransformTargetType } from "../TransformZone"
import { mousePoint } from "@thinairthings/mouse-utils"
import { ContainerState, Point, ScreenState, ViewportState, getSelectionBoundingBox, screenLengthToAbsoluteLength, screenStateToAbsoluteState } from "@thinairthings/zoom-utils"



export const usePointerTransform = (
    pointerTarget: HTMLDivElement | null,
    transformTargetType: TransformTargetType
) => {
    // State
    const [viewportState] = useViewportState()
    const nodeKeySelection = useSelfNodeKeySelection()
    const initialSelectedContainerStatesMap = useNodeSet(liveIndex => new Map([...liveIndex.values()]
        .filter(node => nodeKeySelection.some(selectedNodeKey => selectedNodeKey.nodeId === node.nodeId))
        .map(node => [node.nodeId, {
            nodeKey: createNodeKey(node),
            containerState: node.state.containerState
        }])
    ))
    // Mutation
    const updateNodeState = useUpdateNodeState()
    // Effect
    useEffect(() => {
        if (!pointerTarget) return
        const subscription = fromEvent<PointerEvent>(pointerTarget, 'pointerdown')
        .subscribe(event => {
            // Setup
            const pointerDownPoint = mousePoint(event)
            const initialBoundingBoxState = getSelectionBoundingBox(viewportState, [...initialSelectedContainerStatesMap.values()].map(({ containerState }) => containerState))
            let finalBoundingBoxState: ScreenState
            document.body.setPointerCapture(event.pointerId)
            // Pointer Move
            fromEvent<PointerEvent>(document.body, 'pointermove')
            .pipe(
                takeUntil(fromEvent<PointerEvent, void>(document.body, 'pointerup', {}, event => {
                    document.body.releasePointerCapture(event.pointerId)
                }))
            )
            .subscribe(event => {
                const pointerMovePoint = mousePoint(event);
                // Get new bounding box state
                finalBoundingBoxState = getNewBoundingBoxState(transformTargetType!, {
                    initialBoundingBoxState,
                    pointerDownPoint,
                    pointerMovePoint
                });
                // Handle Shift Scale Transform
                if (event.shiftKey) {
                    const scaleRatio = getScaleRatio(initialBoundingBoxState, finalBoundingBoxState);
                    const {xDirection, yDirection} = (()=>{switch(transformTargetType) {
                        case('topLeft'): return {xDirection: -1, yDirection: -1}
                        case('topRight'): return {xDirection: 1, yDirection: -1}
                        case('bottomLeft'): return {xDirection: -1, yDirection: 1}
                        case('bottomRight'): return {xDirection: 1, yDirection: 1}
                    }})() as {xDirection: -1 | 1, yDirection: -1 | 1}
                    finalBoundingBoxState = getNewBoundingBoxState(transformTargetType!, {
                        initialBoundingBoxState,
                        pointerDownPoint,
                        pointerMovePoint: {
                            x: pointerDownPoint.x + xDirection*((scaleRatio * initialBoundingBoxState.width) - initialBoundingBoxState.width),
                            y: pointerDownPoint.y + yDirection*((scaleRatio * initialBoundingBoxState.height) - initialBoundingBoxState.height)
                        }
                    });

                    // Update Container States
                    initialSelectedContainerStatesMap.forEach(({nodeKey, containerState}) => {
                        updateNodeState(nodeKey, nodeState => nodeState.get('containerState').update({
                            ...applyResizeTransformation(
                                viewportState,
                                initialBoundingBoxState,
                                finalBoundingBoxState,
                                containerState
                            ),
                            scale: scaleRatio * containerState.scale
                        }))
                    })
                    return
                }
                // Update Container States
                initialSelectedContainerStatesMap.forEach(({nodeKey, containerState}) => {
                    updateNodeState(nodeKey, nodeState => nodeState.get('containerState').update(applyResizeTransformation(
                        viewportState,
                        initialBoundingBoxState,
                        finalBoundingBoxState,
                        containerState
                    )))
                })
            })

        })

        return () => subscription.unsubscribe()
    }, [viewportState, nodeKeySelection, initialSelectedContainerStatesMap])
}

const getScaleRatio = (initialBoundingBoxState: ScreenState, finalBoundingBoxState: ScreenState): number => {
    const initialWidth = initialBoundingBoxState.width
    const initialHeight = initialBoundingBoxState.height
    const finalWidth = finalBoundingBoxState.width
    const finalHeight = finalBoundingBoxState.height
    if ((finalWidth / initialWidth) < (finalHeight / initialHeight)){
        return finalWidth / initialWidth
    }
    return finalHeight / initialHeight
}

const applyResizeTransformation = (
    viewportState: ViewportState,
    initialScreenBoundingBoxState: ScreenState, 
    finalScreenBoundingBoxState: ScreenState,
    containerState: ContainerState
): ContainerState => {
    // Get initial distance from origin
    const initialAbsoluteBoundingBoxState = screenStateToAbsoluteState(viewportState, initialScreenBoundingBoxState)
    const {
        absoluteXDistanceFromBoundingBoxOrigin, 
        absoluteYDistanceFromBoundingBoxOrigin
    } = {
        absoluteXDistanceFromBoundingBoxOrigin: containerState.x - initialAbsoluteBoundingBoxState.x,
        absoluteYDistanceFromBoundingBoxOrigin: containerState.y - initialAbsoluteBoundingBoxState.y
    }

    const transformationScreenValues = getScreenTransformationValues(finalScreenBoundingBoxState, initialScreenBoundingBoxState)
    // Apply transformation
    return {
        ...containerState,
        x: containerState.x 
            + absoluteXDistanceFromBoundingBoxOrigin*(transformationScreenValues.xScale - 1) 
            + screenLengthToAbsoluteLength(viewportState, transformationScreenValues.xScreenTranslate),
        y: containerState.y 
            + absoluteYDistanceFromBoundingBoxOrigin*(transformationScreenValues.yScale - 1) 
            + screenLengthToAbsoluteLength(viewportState, transformationScreenValues.yScreenTranslate),
        width: containerState.width * transformationScreenValues.xScale,
        height: containerState.height * transformationScreenValues.yScale
    }
}
const getScreenTransformationValues = (newBoundingBoxState: ScreenState, initialBoundingBoxState: ScreenState): {
    xScale: number
    yScale: number
    xScreenTranslate: number
    yScreenTranslate: number
} => {
    return {
        xScale: newBoundingBoxState.width / initialBoundingBoxState.width,
        yScale: newBoundingBoxState.height / initialBoundingBoxState.height,
        xScreenTranslate: newBoundingBoxState.x - initialBoundingBoxState.x,
        yScreenTranslate: newBoundingBoxState.y - initialBoundingBoxState.y
    }
}

const getNewBoundingBoxState = (type: TransformTargetType, {
    initialBoundingBoxState,
    pointerDownPoint,
    pointerMovePoint
}:{
    initialBoundingBoxState: ScreenState 
    pointerDownPoint: Point
    pointerMovePoint: Point
}): ScreenState=> {
    const dWidth = (pointerMovePoint.x - pointerDownPoint.x)
    const dHeight = (pointerMovePoint.y - pointerDownPoint.y)
    switch(type) {
        case('topLeft'): return {
            ...initialBoundingBoxState,
            x: initialBoundingBoxState.x + dWidth,
            y: initialBoundingBoxState.y + dHeight,
            width: initialBoundingBoxState.width - dWidth,
            height: initialBoundingBoxState.height - dHeight
        }
        case('topMiddle'): return {
            ...initialBoundingBoxState,
            y: initialBoundingBoxState.y + dHeight,
            height: initialBoundingBoxState.height - dHeight
        }
        case('topRight'): return {
            ...initialBoundingBoxState,
            y: initialBoundingBoxState.y + dHeight,
            width: initialBoundingBoxState.width + dWidth,
            height: initialBoundingBoxState.height - dHeight
        }
        case('middleRight'): return {
            ...initialBoundingBoxState,
            width: initialBoundingBoxState.width + dWidth,
        }
        case('bottomRight'): return {
            ...initialBoundingBoxState,
            width: initialBoundingBoxState.width + dWidth,
            height: initialBoundingBoxState.height + dHeight
        }
        case('bottomMiddle'): return {
            ...initialBoundingBoxState,
            height: initialBoundingBoxState.height + dHeight
        }
        case('bottomLeft'): return {
            ...initialBoundingBoxState,
            x: initialBoundingBoxState.x + dWidth,
            width: initialBoundingBoxState.width - dWidth,
            height: initialBoundingBoxState.height + dHeight
        }
        case('middleLeft'): return {
            ...initialBoundingBoxState,
            x: initialBoundingBoxState.x + dWidth,
            width: initialBoundingBoxState.width - dWidth,
        }
    }
}
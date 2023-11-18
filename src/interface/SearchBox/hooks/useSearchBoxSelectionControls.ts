import { Dispatch, SetStateAction, useEffect } from "react"
import { useSetSearchBoxActive } from "../SearchBoxContext"
import { fromEvent } from "rxjs"
import { U, useCreateNode } from "../../../air-systems/AirStorage.configure"
import { screenStateToAbsoluteState } from "@thinairthings/zoom-utils"
import { useViewportState } from "../../ViewportState/ViewportStateContext"



export const useSearchBoxSelectionControls = (
    optionKeys: U['type'][],
    optionIndex: number,
    setOptionIndex: Dispatch<SetStateAction<number>>,
) => {
    // State
    const [viewportState] = useViewportState()
    // Hooks
    const createNode = useCreateNode()
    const setSearchBoxState = useSetSearchBoxActive()
    useEffect(() => {
        const subscription = fromEvent<KeyboardEvent>(window, "keydown")
        .subscribe((event) => {
            if (event.key === 'ArrowUp') {
                setOptionIndex(prev => (prev > -1 ? prev - 1 : optionKeys.length - 1))
            }
            if (event.key === 'ArrowDown') {
                setOptionIndex(prev => (prev < optionKeys.length - 1 ? prev + 1 : -1))
            }
            if (optionIndex !== -1 && event.key === 'Enter') {
                const absoluteScreenDims = screenStateToAbsoluteState(viewportState, {
                    width: window.innerWidth,
                    height: window.innerHeight
                })
                createNode(null, optionKeys[optionIndex], (liveIndexNode) => {
                    const currentContainerState = liveIndexNode.get('state').get('containerState').toImmutable()
                    liveIndexNode.get('state').get('containerState').update({
                        x: absoluteScreenDims.width/2 - viewportState.x - currentContainerState.width/2,
                        y: absoluteScreenDims.height/2 - viewportState.y - currentContainerState.height/2,
                    })
                })
                setSearchBoxState(false)
            }
        })
        return () => subscription.unsubscribe()
    }, [optionIndex])    
}
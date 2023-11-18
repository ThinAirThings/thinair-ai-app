import { ViewportState } from "@thinairthings/zoom-utils";
import { Dispatch, FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { presenceDb } from "../../air-systems/PersistentPresence";


export const ViewportStateContext = createContext<[
    ViewportState,
    (viewportState: ViewportState) => void
]>(null as any)

export const useViewportState = () => useContext(ViewportStateContext)

export const ViewportStateProvider: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    // State
    const [viewportState, setViewportState] = useState<ViewportState>({
        x: 0, y: 0, scale: 1
    })
    // Effects
    useEffect(() => {
        (async () => {
            const previousViewportState = await presenceDb.presence.get('viewportState')
            // presenceDb.presence.put({x: 0, y: 0, scale: 1}, 'viewportState') // Reset
            previousViewportState 
                ? setViewportState(previousViewportState)
                : presenceDb.presence.put(viewportState, 'viewportState')
        })()
    }, [])
    // Callbacks
    const updateViewportState = useCallback((viewportState: ViewportState) => {
        setViewportState(viewportState)
        presenceDb.presence.put(viewportState, 'viewportState')
    }, [])
    return (
        <ViewportStateContext.Provider value={[viewportState, updateViewportState]}>
            {children}
        </ViewportStateContext.Provider>
    )
}


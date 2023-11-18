import { ScreenState } from "@thinairthings/zoom-utils"
import { useSelf, useUpdateMyPresence } from "../../../air-systems/AirStorage.configure"



export const useSelfAbsoluteSelectionBounds = () => {
    const absoluteSelectionBounds = useSelf(self => self.presence.absoluteSelectionBounds)
    const updateMyPresence = useUpdateMyPresence()
    return [
        absoluteSelectionBounds,
        (absoluteSelectionBounds: ScreenState | null) => updateMyPresence({
            absoluteSelectionBounds
        })
    ] as const
}
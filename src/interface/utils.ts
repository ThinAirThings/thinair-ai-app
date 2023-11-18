import { NodeKey } from "@thinairthings/air-storage"
import { useSelfFocusedNodeKey } from "../air-systems/AirStorage.configure"


export const isInterfaceFocused = (focusedNodeKey: NodeKey | null) => {
    return !!focusedNodeKey 
        && document.activeElement?.tagName.toLowerCase() !== "input"
        && document.activeElement?.tagName.toLowerCase() !== "textarea"
}
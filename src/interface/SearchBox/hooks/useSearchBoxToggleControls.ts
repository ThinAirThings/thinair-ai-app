import { useEffect } from "react"
import { useSelfFocusedNodeKey } from "../../../air-systems/AirStorage.configure"
import { fromEvent } from "rxjs"
import { isInterfaceFocused } from "../../utils"





export const useSearchBoxToggleControls = (
    setSearchBoxActive: (active: boolean) => void,
) => {
    const focusedNodeKey = useSelfFocusedNodeKey()
    useEffect(() => {
        const subscription = fromEvent<KeyboardEvent>(document, "keydown")
        .subscribe((event) => {
            if(!isInterfaceFocused(focusedNodeKey)) {
                if (event.code === "Space"){
                    event.preventDefault()
                    setSearchBoxActive(true)
                }
            } 
            if (event.key === "Escape"){
                event.preventDefault()
                setSearchBoxActive(false)
            }
        })
        return () => subscription.unsubscribe()
    })
}
import { create } from "zustand"
import {combine} from "zustand/middleware"

export const useStateStore = create(
    combine({
        selectedComponentId: null as string | null
    }, (set) => ({
        updateSelectedComponentId: (componentId: string|null) => set(() => ({ selectedComponentId: componentId }))
    }))
)
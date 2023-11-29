import { create } from "zustand"
import {combine} from "zustand/middleware"

export const useStateStore = create(
    combine({
        selectedComponentId: null as string | null,
        leftPanelWidth: 352,
        bottomPanelHeight: 500,
    }, (set) => ({
        updateSelectedComponentId: (componentId: string | null) => set(() => ({ selectedComponentId: componentId })),
        updateLeftPanelWidth: (width: number) => set(() => ({ 
            leftPanelWidth: 200 < width 
                ? width < 1200
                    ? width
                    : 1200
                : 200
        })),
        updateBottomPanelHeight: (height: number) => set(() => ({
            bottomPanelHeight: 200 < height 
                ? height < 850
                    ? height
                    : 850
                : 200
        })),
    }))
)
import { LiveObject, LsonObject } from "@liveblocks/client"
import { TreeAirNode, defineAirNode } from "@thinairthings/air-storage"
import { ContainerState } from "@thinairthings/zoom-utils"


export type ContainerNodeBaseState = LsonObject & {
    containerState: LiveObject<ContainerState>
}

export const defineContainerNode = <
    T extends string=string,
    S extends ContainerNodeBaseState=ContainerNodeBaseState,
    C extends TreeAirNode[]|[]=[],
>(
    type: T,
    defaultInitialState: S,
    children: C
) => defineAirNode(type, defaultInitialState, children)
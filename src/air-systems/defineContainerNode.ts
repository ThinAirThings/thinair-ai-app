import { LiveObject, LsonObject } from "@liveblocks/client"
import { NodeKey, TreeAirNode, defineAirNode } from "@thinairthings/air-storage"
import { ContainerState } from "@thinairthings/zoom-utils"
import { FC } from "react"
import { Icon } from "react-feather"


export type ContainerNodeBaseState = LsonObject & {
    containerState: LiveObject<ContainerState>
}

export type ContainerNodeStaticStructure<
    T extends string=string,
    S extends LsonObject=LsonObject,
    C extends TreeAirNode[]|[]=[]
> = {
    displayName: string
    Icon: Icon,
    Component: FC<{
        nodeKey: NodeKey<any, any>
    }>
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
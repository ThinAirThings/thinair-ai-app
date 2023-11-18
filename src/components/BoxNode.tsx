import { NodeKey } from "@thinairthings/air-storage";
import { DomContainer } from "../interface/DomContainer/DomContainer";
import { U } from "../air-systems/AirStorage.configure";
import { FC } from "react";


export const BoxNode: FC<{
    nodeKey: NodeKey<U, 'BoxNode'>
}> = ({
    nodeKey
}) => <DomContainer nodeKey={nodeKey}/>

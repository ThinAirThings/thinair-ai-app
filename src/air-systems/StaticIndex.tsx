import { defineStaticIndex } from "./AirStorage.configure";
import { Archive, Box, File, Icon, Terminal } from "react-feather";
import { BoxNode } from "../components/BoxNode";


export type ContainerNodeStaticStructure = {
    displayName: string
    Icon: Icon,
}

export const StaticIndex = defineStaticIndex<ContainerNodeStaticStructure>({
    'BoxNode': {
        Icon: Box,
        displayName: 'Box',
        Component: ({nodeKey}) => <BoxNode nodeKey={nodeKey}/>
    },
    'DirectoryTreeNode' : {
        Icon: Archive,
        displayName: 'Directory Tree',
        Component: ({nodeKey}) => null
    },
    "TerminalNode": {
        Icon: Terminal,
        displayName: 'Terminal',
        Component: ({nodeKey}) => null
    },
    "FileNode": {
        Icon: File,
        displayName: 'File',
        Component: ({nodeKey}) => null
    }
})

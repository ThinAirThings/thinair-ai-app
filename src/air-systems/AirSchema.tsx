import { defineAirNodeSchema } from "@thinairthings/air-storage";
import { defineContainerNode } from "./defineContainerNode";
import { LiveObject } from "@liveblocks/client";

export const AirSchema = () => defineAirNodeSchema([
    defineContainerNode('BoxNode', {
        containerState: new LiveObject({
            x: 0, y: 0,
            width: 400, height: 600,
            scale: 1
        })
    }, []),
    defineContainerNode('DirectoryTreeNode', {
        workingDirectory: '~',
        containerState: new LiveObject({
            x: 0, y: 0,
            width: 300, height: 600,
            scale: 1
        })
    }, []),
    defineContainerNode('TerminalNode', {
        containerState: new LiveObject({
            x: 0, y: 0,
            width: 800, height: 300,
            scale: 1
        })
    }, []),
    defineContainerNode('FileNode', {
        fileName: 'New File',
        containerState: new LiveObject({
            x: 0, y: 0,
            width: 400, height: 600,
            scale: 1
        })
    }, [])
    // defineContainerNode('DirectoryNode', {
    //     Icon: Folder,
    //     displayName: 'Directory',
    //     Component: (nodeKey) => null
    // }, {
    //     directoryName: 'New Directory',
    //     containerState: new LiveObject({
    //         x: 0, y: 0,
    //         width: 400, height: 600,
    //         scale: 1
    //     })
    // }, [

    // ])
])
import { TreeToNodeUnion, configureStorage } from "@thinairthings/air-storage";
import { AirSchema } from "./AirSchema";
import { ScreenState } from "@thinairthings/zoom-utils";


export type U = TreeToNodeUnion<ReturnType<typeof AirSchema>>

type PresenceExtension = {
    absoluteSelectionBounds: ScreenState | null
}
export const {
    // Liveblocks Hooks
    useUpdateMyPresence,
    useSelf,
    useRoom,
    RoomContext,
    useStorage,
    // Air Storage Hooks
    useNodeSet,
    useCreateNode,
    useSelectNodeState,
    useUpdateNodeState,
    useDeleteNode,
    // Air Presence NodeKeySelection Hooks
    useSelfNodeKeySelection,
    useSelfNodeKeySelectionAdd,
    useSelfNodeKeySelectionRemove,
    useSelfNodeKeySelectionUpdate,
    // Air Presence NodeKeyFocus Hooks
    useSelfFocusedNodeKey,
    useSelfFocusedNodeKeyUpdate,
    // Air Storage Provider
    StorageProvider,
    // Structure Builder Functions
    defineStaticIndex,
    createNodeKey
} = configureStorage<U, PresenceExtension>(
    {publicApiKey: "pk_dev_OKf2MOdxAy48m122OZKza4rhi90VQizZ8qq8PQQeSplCVcfZkxDBQLfd3iwNzgkH"},
    AirSchema(), {
        absoluteSelectionBounds: null as ScreenState | null,
    }
)


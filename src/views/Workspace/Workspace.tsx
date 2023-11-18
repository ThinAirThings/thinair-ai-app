import styled from "styled-components"
import { TopLeftTag } from "../../interface/TopLeftTag/TopLeftTag"
import { SearchBoxProvider } from "../../interface/SearchBox/SearchBoxContext"
import { ContextWrapper } from "@thinairthings/react-utils"
import { AirStorageProvider, useNodeSet, useSelfNodeKeySelection, useStorage } from "../../air-systems/AirStorage.configure"
import { ViewportStateProvider } from "../../interface/ViewportState/ViewportStateContext"
import { DomViewportTarget } from "../../interface/DomViewportTarget/DomViewportTarget"
import { DomReferencePoint } from "../../interface/DomReferencePoint/DomReferencePoint"
import { SelectionBox } from "../../interface/SelectionBox/SelectionBox"
import { SelectionBoundingBox } from "../../interface/SelectionBoundingBox/SelectionBoundingBox"
import { RightClickMenuProvider } from "../../interface/RightClickMenu/RightClickMenu"


export const Interface = () => {
    return (
        <Screen>
            <ContextWrapper ContextArray={[
                ({children}) => <ViewportStateProvider>{children}</ViewportStateProvider>,
                ({children}) => <SearchBoxProvider>{children}</SearchBoxProvider>,
                ({children}) => <RightClickMenuProvider>{children}</RightClickMenuProvider>,
            ]}>
                <DomViewportTarget>
                    <DomReferencePoint/>
                </DomViewportTarget>
                <SelectionBoundingBox/>
                <SelectionBox/> 
                <TopLeftTag/>
            </ContextWrapper>
        </Screen>
    )
}

const Screen = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: ${({theme}) => theme.dark.bg};
`


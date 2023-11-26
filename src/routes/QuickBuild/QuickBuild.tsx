import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../styles/stackStyle";
import { ComponentDirectory } from "./ComponentDirectory/ComponentDirectory";
import { ComponentPreview } from "./ComponentPreview/ComponentPreview";
import { useStateStore } from "../../storage/useStateStore";




export const QuickBuild: FC = () => {
    const selectedComponentId = useStateStore(state => state.selectedComponentId)
    return (
        <QuickBuildContainer>
            <ComponentDirectory/>
            {selectedComponentId && <ComponentPreview selectedComponentId={selectedComponentId}/>}
        </QuickBuildContainer>
    )
}


const QuickBuildContainer = styled.div(stack('h', 'left', 'top'), {
    width: `100%`,
    height: `100%`,
})
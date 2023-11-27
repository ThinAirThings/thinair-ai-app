import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../styles/stackStyle";
import { ComponentDirectory } from "./ComponentDirectory/ComponentDirectory";
import { ComponentPreview } from "./ComponentPreview/ComponentPreview";
import { useStateStore } from "../../storage/useStateStore";
import { InfinitySpinSuspense } from "../../interface/InfinitySpinSuspense/InfinitySpinSuspense";




export const QuickBuild: FC = () => {
    return (
        <QuickBuildContainer>
            <ComponentDirectory/>
        </QuickBuildContainer>
    )
}


const QuickBuildContainer = styled.div(stack('h', 'left', 'top'), {
    width: `100%`,
    height: `100%`,
})
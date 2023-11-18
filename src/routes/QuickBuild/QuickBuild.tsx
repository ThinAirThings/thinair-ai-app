import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../styles/stackStyle";
import { ComponentDirectory } from "./ComponentDirectory/ComponentDirectory";




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
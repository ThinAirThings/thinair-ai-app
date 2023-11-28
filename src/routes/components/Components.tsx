import styled from "@emotion/styled";
import { FC } from "react";
import { ComponentDirectory } from "./ComponentDirectory/ComponentDirectory";
import { ModelManagementPanel } from "./ModelManagementPanel/ModelManagementPanel";




export const Components: FC = () => {
    return (
        <ComponentsContainer>
            <ComponentDirectory style={{gridRow: '1/3'}}/>

            <ModelManagementPanel css={{gridRow: '2/3'}}/>
        </ComponentsContainer>
    )
}


const ComponentsContainer = styled.div({
    display: 'grid',
    gridTemplateColumns: `352px 1fr`,
    gridTemplateRows: `1.5fr 1fr`,
    width: `100%`,
    height: `100%`,
})

import styled from "@emotion/styled";
import { FC } from "react";
import { ComponentDirectory } from "./ComponentDirectory/ComponentDirectory";
import { ModelManagementPanel } from "./ModelManagementPanel/ModelManagementPanel";
import { useStateStore } from "../../storage/useStateStore";
import { ComponentManagementPanel } from "./ComponentManagementPanel/ComponentManagementPanel";




export const Components: FC = () => {
    const leftPanelWidth = useStateStore(state => state.leftPanelWidth)
    const bottomPanelHeight = useStateStore(state => state.bottomPanelHeight)
    return (
        <ComponentsContainer
            style={{
                gridTemplateColumns: `${leftPanelWidth}px 1fr`,
                gridTemplateRows: `1fr ${bottomPanelHeight}px`
            }}
        >
            <ComponentDirectory style={{gridRow: '1/3'}}/>
            <ComponentManagementPanel css={{gridRow: '1/2'}}/>
            <ModelManagementPanel css={{gridRow: '2/3'}}/>
        </ComponentsContainer>
    )
}


const ComponentsContainer = styled.div({
    display: 'grid',
    width: `100%`,
    height: `100%`,
})

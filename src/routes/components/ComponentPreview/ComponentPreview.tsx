import { FC } from "react";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import styled from "@emotion/styled";
import { stack } from "../../../styles/stackStyle";
import * as designTokens from '../../../style-dictionary-dist/variables'
import { Button } from "../../../primitives/Button/Button";
import { Searchbar } from "../../../components/Searchbar/Searchbar";


export const ComponentPreview: FC<{
    selectedComponentId: string
}> = ({
    selectedComponentId
}) => {
    // Queries
    const selectedComponent = useThinAir(['components', selectedComponentId], 'GET')
    // Mutations
    const updateComponent = useThinAir(['components', selectedComponentId], 'POST')

    return (
        <ComponentPreviewContainer>
            <PreviewHeader>
                <span>Component Preview</span>
                <Button color='black'>Get Code Snippet!</Button>
            </PreviewHeader>
            <PreviewBody>
                <Searchbar/> 
            </PreviewBody>
        </ComponentPreviewContainer>
    )
}

const ComponentPreviewContainer = styled.div(stack('v', 'left', 'top'), { 
    width: `100%`,
    height: `100%`,
    gap: 15
})

const PreviewHeader = styled.div(stack('h', 'distribute', 'center'), {
    width: `100%`,
    padding: '14px 24px',
    '>span': {
        ...designTokens.FontSectionHeader
    }
})

const PreviewBody = styled.div(stack('v', 'center', 'top'), {
    width: `100%`,
    height: `100%`,
    padding: '14px 24px',
})
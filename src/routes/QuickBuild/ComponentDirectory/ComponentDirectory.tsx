import styled from "@emotion/styled"
import { stack } from "../../../styles/stackStyle"
import { FC } from "react"
import * as designTokens from '../../../style-dictionary-dist/variables'
import { ComponentSelect } from "../ComponentSelect/ComponentSelect"


export const ComponentDirectory: FC = () => {
    return (
        <ComponentDirectoryContainer>
            <ComponentSelect/>
        </ComponentDirectoryContainer>
    )
}

const ComponentDirectoryContainer = styled.div(stack('v', 'left', 'top'), {
    width: `352px`,
    height: `100%`,
    borderRight: `1px solid ${designTokens.ColorsGray400}`,
    padding: `24px 16px`,
})

import styled from "@emotion/styled"
import { stack } from "../../../styles/stackStyle"
import { FC, useState } from "react"
import * as designTokens from '../../../style-dictionary-dist/variables'
import { ComponentSelect } from "../ComponentSelect/ComponentSelect"
import { FileUpload } from "../FileUpload/FileUpload"
import { useStateStore } from "../../../storage/useStateStore"
import { FileSelect } from "../FileSelect/FileSelect"


export const ComponentDirectory: FC = () => {
    return (
        <ComponentDirectoryContainer>
            <ComponentSelect/>
            <FileUpload/>
            <FileSelect/>
        </ComponentDirectoryContainer>
    )
}

const ComponentDirectoryContainer = styled.div(stack('v', 'left', 'top'), {
    width: `352px`,
    height: `100%`,
    borderRight: `1px solid ${designTokens.ColorsGray400}`,
    padding: `24px 16px`,
    gap: 15
})

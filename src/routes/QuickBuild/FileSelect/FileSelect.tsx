import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../../styles/stackStyle";
import * as designTokens from '../../../style-dictionary-dist/variables'
import Select from 'react-select'
import { useStateStore } from "../../../storage/useStateStore";
import { useDataFiles } from "./hooks/useDataFiles";
export const FileSelect: FC = () => {
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    const dataFiles = useDataFiles()
    console.log(dataFiles.data)
    return (
        <>{
            selectedComponentId && 
            <FileSelectContainer>
                <span>Select Files</span>
                <Select
                    isMulti
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: '100%',
                        }),
                    }}
                />
            </FileSelectContainer>

        }
        </>
    )
}


const FileSelectContainer = styled.div(stack('v', 'left', 'top'), {
    width: '100%',
    gap: 5,
    '>span': {
        ...designTokens.FontInputHeader
    }
})
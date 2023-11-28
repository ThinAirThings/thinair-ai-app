import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../../styles/stackStyle";
import * as designTokens from '../../../style-dictionary-dist/variables'
import Select from 'react-select'
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { reactSelectTheme } from "../../../styles/reactSelect.theme";
export const FileSelect: FC<{
    selectedComponentId: string
}> = ({
    selectedComponentId
}) => {
    const dataFiles = useThinAir(['components', selectedComponentId!, 'data_files'], 'GET')
    return (<>{
        selectedComponentId && 
        <FileSelectContainer>
            <span>Select Files</span>
            <Select
                isMulti
                options={Object.entries(dataFiles.data.dataFiles).map(([fileId, {fileName}]) => ({
                    label: fileName,
                    value: fileId
                }))}
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: '100%',
                    }),
                }}
                theme={reactSelectTheme}
            />
        </FileSelectContainer>

    }</>)
}


const FileSelectContainer = styled.div(stack('v', 'left', 'top'), {
    width: '100%',
    gap: 5,
    '>span': {
        ...designTokens.FontInputHeader
    }
})
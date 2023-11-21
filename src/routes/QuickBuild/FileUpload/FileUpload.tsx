import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../../styles/stackStyle";
import * as designTokens from '../../../style-dictionary-dist/variables'
import { PlusCircle } from "react-feather";
import {useDropzone} from 'react-dropzone'
import { useStateStore } from "../../../storage/useStateStore";
import { useCreateModelDataFile } from "./hooks/useCreateModelDataFile";

export const FileUpload: FC = () => {
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    const createModelDataFile = useCreateModelDataFile()
    // Dropzone
    const {
        getRootProps, 
        getInputProps, 
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            console.log(await createModelDataFile.mutateAsync(
                acceptedFiles[0]
            ))
        },
        accept: {
            'text/csv': ['.csv']
        }
    })
    return (<>{
        selectedComponentId && 
        <FileUploadContainer  {...getRootProps()}>
            <span>Upload CSV Files</span>
            <UploadTarget 
                isDragActive={isDragActive}
                isDragAccept={isDragAccept}
                isDragReject={isDragReject}
            >
                <input {...getInputProps()} />
                <PlusCircle/>
                <span>Upload a File or Drag and Drop Here</span>
            </UploadTarget>
        </FileUploadContainer>
    }</>)
}

const FileUploadContainer = styled.div(stack('v', 'left', 'top'),  {
    width: '100%',
    gap: 7,
    '>span': {
        ...designTokens.FontInputHeader
    }
})

const UploadTarget = styled.div<{
    isDragActive?: boolean
    isDragAccept?: boolean
    isDragReject?: boolean
}>(stack('v', 'center', 'center'), {
    cursor: 'pointer',
    width: '100%',
    aspectRatio: '2/1',
    borderRadius: 20,
    gap: 5,
    border: `1px dashed ${designTokens.ColorsGray600}`,
    '>svg': {
        width: 30,
        height: 30,
        stroke: designTokens.ColorsGray600
    },
    '>span': {
        ...designTokens.FontInputHeader,
        color: designTokens.ColorsGray600
    }
}, (props) => ({
    backgroundColor: props.isDragAccept 
        ? designTokens.ColorsGreen200
        : props.isDragReject
        ? designTokens.ColorsRed200
        : props.isDragActive
        ? designTokens.ColorsGray200
        : designTokens.ColorsWhite,
}))
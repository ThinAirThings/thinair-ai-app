import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../../styles/stackStyle";
import * as designTokens from '../../../style-dictionary-dist/variables'
import { PlusCircle } from "react-feather";
import {useDropzone} from 'react-dropzone'
import { useStateStore } from "../../../storage/useStateStore";
import { useCreateModelDataFile } from "./hooks/useCreateModelDataFile";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { convertFileToBase64 } from "./file-utils";

export const FileUpload: FC = () => {
    // State
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    // Mutations
    const createDataFile = useThinAir(['components', selectedComponentId!, 'data_files'], 'POST')
    // Dropzone
    const {
        getRootProps, 
        getInputProps, 
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            console.log(await createDataFile.mutateAsync({
                fileType: acceptedFiles[0].type,
                fileName: acceptedFiles[0].name,
                fileData: await convertFileToBase64(acceptedFiles[0])
            }))
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
    border: `1px dashed ${designTokens.PrimitivesColorsGray600}`,
    transition: 'background-color 0.2s ease-in-out',
    ':hover': {
        backgroundColor: designTokens.PrimitivesColorsGray200
    },
    '>svg': {
        width: 30,
        height: 30,
        stroke: designTokens.PrimitivesColorsGray600
    },
    '>span': {
        ...designTokens.FontInputHeader,
        color: designTokens.PrimitivesColorsGray600
    }
}, (props) => ({
    backgroundColor: props.isDragAccept 
        ? designTokens.PrimitivesColorsGreen200
        : props.isDragReject
        ? designTokens.PrimitivesColorsRed200
        : props.isDragActive
        ? designTokens.PrimitivesColorsGray200
        : designTokens.PrimitivesColorsWhite,
}))
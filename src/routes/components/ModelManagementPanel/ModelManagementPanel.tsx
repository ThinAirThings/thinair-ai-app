import styled from "@emotion/styled";
import { Box, Button, Flex, Heading, ScrollArea, Tabs } from "@radix-ui/themes";
import { FC, useState } from "react";
import { ExtractComponentParameters } from "../../../ui/helpers/extract-component-parameters";
import { FileTable } from "./FileTable";
import { SystemPrompt } from "./SystemPrompt";
import { UploadIcon } from "@radix-ui/react-icons";
import { useStateStore } from "../../../storage/useStateStore";
import { useDropzone } from "react-dropzone";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { convertFileToBase64 } from "../../../helpers/file-utils";
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton";
import { PanelSlider } from "../../../interface/PanelSlider/PanelSlider";
import { FileUploadDialog } from "./FileUploadDialog";


export const ModelManagementPanel: FC<ExtractComponentParameters<typeof ModelManagementPanelRoot>> = ({...props}) => {
    // State
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
    const [
        leftPanelWidth,
        bottomPanelHeight,
        updateLeftPanelWidth,
        updateBottomPanelHeight
    ] = useStateStore(state => [
        state.leftPanelWidth,
        state.bottomPanelHeight,
        state.updateLeftPanelWidth,
        state.updateBottomPanelHeight
    ])
    // Mutations
    const createDataFile = useThinAir(['components', selectedComponentId??'', 'data_files'], 'POST')
    const {
        getInputProps, 
        getRootProps,
        isFileDialogActive
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            // Get userid
            const result = await createDataFile.mutateAsync({
                fileType: acceptedFiles[0].type,
                fileName: acceptedFiles[0].name,
                fileData: await convertFileToBase64(acceptedFiles[0])
            }, {
                onSuccess: () => {
                    createDataFile.reset()
                }
            }) as any
            const formData = new FormData()
            formData.append('user_id', `xxx_${result.userId.replaceAll('-', '_')}`)
            formData.append('partition_id', `xxx_${selectedComponentId!.replaceAll('-', '_')}`)
            formData.append('subset', JSON.stringify(['brandName', 'title']))
            formData.append('file', acceptedFiles[0])
            const uploadResult = await fetch('http://a3952811bef8a47c3988b9884fe872fd-1284189378.us-east-2.elb.amazonaws.com/vecdb/upload_csv', {
                method: 'POST',
                body: formData,
                mode:'no-cors'
            })
            const uploadJson = await uploadResult.json()
            const uploadResultText = await uploadResult.text()
            console.log(uploadJson)
            console.log(uploadResultText)
            // const jsonUploadResult = await uploadResult.json()
            // console.log(jsonUploadResult)
            // await createDataFile.mutateAsync({
            //     fileType: acceptedFiles[0].type,
            //     fileName: acceptedFiles[0].name,
            //     fileData: await convertFileToBase64(acceptedFiles[0])
            // }, {
            //     onSuccess: () => {
            //         createDataFile.reset()
            //     }
            // })

        },
        accept: {
            'text/csv': ['.csv'],
            'application/json': ['.json']
        }
    })
    return (
        <>
            <input {...getInputProps()} />
            <ModelManagementPanelRoot 
                {...props} direction={'column'}
            >
                <PanelSlider
                    orientation="horizontal"
                    location="start"
                    sliderGroup={1}
                    sliderControlledDimension={bottomPanelHeight}
                    setSliderControlledDimension={updateBottomPanelHeight}
                />
                <PanelSlider
                    orientation="horizontal"
                    location="start"
                    sliderGroup={1}
                    joint
                    sliderControlledDimension={[leftPanelWidth, bottomPanelHeight]}
                    setSliderControlledDimension={(value: [number, number]) => {
                        updateLeftPanelWidth(value[0])
                        updateBottomPanelHeight(value[1])
                    }}
                />
                <Heading size={'3'}>Model Management</Heading>
                <ScrollArea scrollbars="vertical">
                <Tabs.Root defaultValue="systemPrompt" css={{height: "100%"}}>
                    <Tabs.List>
                        <Flex justify={'between'} width={'100%'}>
                            <Flex>
                                <Tabs.Trigger value="systemPrompt">System Prompt</Tabs.Trigger>
                                <Tabs.Trigger value="fileTable">File Table</Tabs.Trigger>
                                <Tabs.Trigger value="tuning">Tuning</Tabs.Trigger>
                            </Flex>
                            <Tabs.Content value="fileTable">
                                <Button 
                                    size='1'
                                    onClick={() => setFileUploadDialogOpen(true)}
                                ><UploadIcon/>Upload Data</Button>
                                <FileUploadDialog dialogState={[fileUploadDialogOpen, setFileUploadDialogOpen]}/>
                            </Tabs.Content>
                        </Flex>
                    </Tabs.List>
                    <Box px={'2'} pt={'3'} >
                        <Tabs.Content value="systemPrompt" css={{height: '100%'}}>
                            <SystemPrompt/>
                        </Tabs.Content>
                        <Tabs.Content value="fileTable">
                            <FileTable/>
                        </Tabs.Content>
                        <Tabs.Content value="tuning">Tuning</Tabs.Content>
                    </Box>
                </Tabs.Root>
                </ScrollArea>
            </ModelManagementPanelRoot>
        </>
    )
}

const ModelManagementPanelRoot = styled(Flex)(({theme}) => ({
    position: 'relative',
    gap: 3,
    padding: 10,
    width: '100%',
    height: '100%',
    borderTop: `1px solid ${theme.colors.neutralBorders8}`,
}))
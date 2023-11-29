import styled from "@emotion/styled";
import { Box, Flex, Heading, Tabs } from "@radix-ui/themes";
import { FC, useState } from "react";
import { ExtractComponentParameters } from "../../../ui/helpers/extract-component-parameters";
import { FileTable } from "./FileTable";
import { SystemPrompt } from "./SystemPrompt";
import { UploadIcon } from "@radix-ui/react-icons";
import { useStateStore } from "../../../storage/useStateStore";
import { useDropzone } from "react-dropzone";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { convertFileToBase64 } from "../FileUpload/file-utils";
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton";
import { PanelSlider } from "../../../interface/PanelSlider/PanelSlider";


export const ModelManagementPanel: FC<ExtractComponentParameters<typeof ModelManagementPanelRoot>> = ({...props}) => {
    // State
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
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
    const [panelRef, setPanelRef] = useState<HTMLDivElement | null>(null)
    // Mutations
    const createDataFile = useThinAir(['components', '{id}', 'data_files'], 'POST')
    const {
        getInputProps, 
        getRootProps,
        isFileDialogActive
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            await createDataFile.mutateAsync({
                id: selectedComponentId!,
                fileType: acceptedFiles[0].type,
                fileName: acceptedFiles[0].name,
                fileData: await convertFileToBase64(acceptedFiles[0])
            }, {
                onSuccess: () => {
                    createDataFile.reset()
                }
            })
        },
        accept: {
            'text/csv': ['.csv']
        }
    })
    return (
        <>
            <input {...getInputProps()} />
            <ModelManagementPanelRoot 
                ref={setPanelRef}
                {...props} direction={'column'}
            >
                <PanelSlider
                    orientation="horizontal"
                    location="start"
                    sliderGroup={1}
                    referenceContainer={panelRef}
                    sliderControlledDimension={bottomPanelHeight}
                    setSliderControlledDimension={updateBottomPanelHeight}
                />
                <PanelSlider
                    orientation="horizontal"
                    location="start"
                    sliderGroup={1}
                    joint
                    referenceContainer={panelRef}
                    sliderControlledDimension={[leftPanelWidth, bottomPanelHeight]}
                    setSliderControlledDimension={(value: [number, number]) => {
                        updateLeftPanelWidth(value[0])
                        updateBottomPanelHeight(value[1])
                    }}
                />
                <Heading size={'3'}>Model Management</Heading>
                <Tabs.Root defaultValue="fileTable" css={{height: "100%"}}>
                    <Tabs.List>
                        <Flex justify={'between'} width={'100%'}>
                            <Flex>
                                <Tabs.Trigger value="systemPrompt">System Prompt</Tabs.Trigger>
                                <Tabs.Trigger value="fileTable">File Table</Tabs.Trigger>
                                <Tabs.Trigger value="tuning">Tuning</Tabs.Trigger>
                            </Flex>
                            <Tabs.Content value="fileTable">
                                <LoadingButton
                                    isLoading={isFileDialogActive || createDataFile.isPending}
                                    size={'1'}
                                    {...getRootProps()}
                                >
                                    <UploadIcon/>Upload Files
                                </LoadingButton>
                                
                            </Tabs.Content>
                        </Flex>
                    </Tabs.List>
                    <Box px={'2'} pt={'3'} height={'100%'}>
                        <Tabs.Content value="systemPrompt" css={{height: '100%'}}>
                            <SystemPrompt/>
                        </Tabs.Content>
                        <Tabs.Content value="fileTable">
                            <FileTable/>
                        </Tabs.Content>
                        <Tabs.Content value="tuning">Tuning</Tabs.Content>
                    </Box>
                </Tabs.Root>
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
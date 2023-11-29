import styled from "@emotion/styled"
import { stack } from "../../../styles/stackStyle"
import { FC, Suspense, useState } from "react"
import { ContextMenu, Dialog, Flex, Text } from "@radix-ui/themes"
import { ThinAirLoadingSpinner } from "../../../ui/components/ThinAirLoadingSpinner/ThinAirLoadingSpinner"
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton"
import { ComponentList } from "./ComponentList"
import { CreateComponentDialog } from "./CreateComponentDialog"
import { ExtractComponentParameters } from "../../../ui/helpers/extract-component-parameters"
import { useStateStore } from "../../../storage/useStateStore"
import { PanelSlider } from "../../../interface/PanelSlider/PanelSlider"

export const ComponentDirectory: FC<ExtractComponentParameters<typeof ComponentDirectoryRoot>> = ({...props}) => {
    // State
    const [createComponentDialogOpen, setCreateComponentDialogOpen] = useState(false);
    const [
        leftPanelWidth,
        updateLeftPanelWidth
    ] = useStateStore(state => [
        state.leftPanelWidth,
        state.updateLeftPanelWidth
    ])
    const [directoryRef, setDirectoryRef] = useState<HTMLDivElement | null>(null)
    return (
        <ComponentDirectoryRoot 
            ref={setDirectoryRef}
            {...props}
        >
            <PanelSlider 
                orientation="vertical"
                location="end"
                sliderGroup={1}
                referenceContainer={directoryRef}
                sliderControlledDimension={leftPanelWidth}
                setSliderControlledDimension={updateLeftPanelWidth}
            />
            <Suspense fallback={
                <Flex justify={'center'} direction={'column'} width={'100%'}>
                    <ThinAirLoadingSpinner/>
                </Flex>
            }>
                <CreateComponentDialog dialogState={[createComponentDialogOpen, setCreateComponentDialogOpen]}/>
                <Flex justify={'between'} align={'stretch'} width={'100%'} css={{
                    '@container directory (max-width: 200px)': {
                        justifyContent: 'flex-end'
                    },
                }}>
                    <Text weight="bold" size={'3'} css={{
                        '@container directory (max-width: 200px)': {
                            display: 'none'
                        },
                    }}>Component Directory</Text>
                    <LoadingButton
                        highContrast
                        size={'1'}
                        color="gray"
                        onClick={() => setCreateComponentDialogOpen(true)}
                    >+ Create New</LoadingButton>
                </Flex>
                <ContextMenu.Root>
                    <ContextMenu.Trigger>
                        <Flex direction={'column'} width={'100%'} height={'100%'}>
                            <ComponentList/>
                        </Flex>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content>
                        <ContextMenu.Item 
                            color={'green'} 
                            onSelect={() => setCreateComponentDialogOpen(true)}
                        >
                            {`Create New Component`}
                        </ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Root>
            </Suspense>
        </ComponentDirectoryRoot>
    )
}

const ComponentDirectoryRoot = styled.div(stack('v', 'left', 'top'), ({theme}) => ({
    containerName: 'directory',
    containerType: 'inline-size',
    position: `relative`,
    height: `100%`,
    borderRight: `1px solid ${theme.colors.neutral10}`,
    padding: `24px 16px`,
    gap: 15
}))


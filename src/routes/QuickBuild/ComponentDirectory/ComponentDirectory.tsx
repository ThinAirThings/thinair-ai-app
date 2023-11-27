import styled from "@emotion/styled"
import { stack } from "../../../styles/stackStyle"
import { Component, FC, Suspense, useState } from "react"
import { useStateStore } from "../../../storage/useStateStore"
import { useThinAir } from "../../../clients/Thinair/useThinAir"
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { RotatingLines } from "react-loader-spinner"
import { ComponentLoadingSpinner } from "../../../primitives/ComponentLoadingSpinner/ComponentLoadingSpinner"
import { ComponentSelect } from "../ComponentSelect/ComponentSelect"
import { ThinAirLoadingSpinner } from "../../../primitives/ThinAirLoadingSpinner/ThinAirLoadingSpinner"

export const ComponentDirectory: FC = () => {
    // State
    const [selectedComponentId, updateSelectedComponentId] = useStateStore((state) => [
        state.selectedComponentId,
        state.updateSelectedComponentId
    ])

    const [buttonLoading, setButtonLoading] = useState(false)
    // Mutations
    const deleteComponent = useThinAir(['components', selectedComponentId!], 'DELETE')
    return (
        <ComponentDirectoryContainer>
            <Suspense fallback={
                <Flex justify={'center'} direction={'column'} width={'100%'}>
                    <ThinAirLoadingSpinner/>
                </Flex>
            }>
                <ComponentSelect/>
            </Suspense>
            
                {/* <ComponentSelect/>  */}
                {/* {selectedComponentId && <ComponentNameInput selectedComponentId={selectedComponentId}/>}
                <InfinitySpinSuspense width={200}>
                    <FileUpload/>
                    {selectedComponentId && <FileSelect selectedComponentId={selectedComponentId}/>}
                    {selectedComponentId && <Button
                        color="red"
                        style={{
                            alignSelf: 'center',
                            justifySelf: 'flex-end',
                            position: 'absolute',
                            bottom: 24,
                            width: 250
                        }}
                        onClick={async () => {
                            setButtonLoading(true)
                            await deleteComponent.mutateAsync(undefined)
                            updateSelectedComponentId(null)
                            setButtonLoading(false)
                        }}
                        isLoading={buttonLoading}
                    >Delete Component</Button>
                    }
                </InfinitySpinSuspense> */}
            {/* </InfinitySpinSuspense> */}
            </ComponentDirectoryContainer>
    )
}

const ComponentDirectoryContainer = styled.div(stack('v', 'left', 'top'), ({theme}) => ({
    width: `352px`,
    height: `100%`,
    borderRight: `1px solid ${theme.colors.neutral[10]}`,
    padding: `24px 16px`,
    gap: 15
}))

const FullWidthSelect = styled(Select.Root)({
    width: '100%'
})
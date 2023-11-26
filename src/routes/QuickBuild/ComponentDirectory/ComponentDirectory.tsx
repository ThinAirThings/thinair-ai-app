import styled from "@emotion/styled"
import { stack } from "../../../styles/stackStyle"
import { FC, useState } from "react"
import * as designTokens from '../../../style-dictionary-dist/variables'
import { ComponentSelect } from "../ComponentSelect/ComponentSelect"
import { FileUpload } from "../FileUpload/FileUpload"
import { useStateStore } from "../../../storage/useStateStore"
import { FileSelect } from "../FileSelect/FileSelect"
import { InfinitySpinSuspense } from "../../../interface/InfinitySpinSuspense/InfinitySpinSuspense"
import { useThinAir } from "../../../clients/Thinair/useThinAir"
import { Button } from "../../../primitives/Button/Button"
import { ComponentNameInput } from "../ComponentNameInput/ComponentNameInput"

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
            <InfinitySpinSuspense width={200}>
                <ComponentSelect/>
                {selectedComponentId && <ComponentNameInput selectedComponentId={selectedComponentId}/>}
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
                </InfinitySpinSuspense>
            </InfinitySpinSuspense>
        </ComponentDirectoryContainer>
    )
}

const ComponentDirectoryContainer = styled.div(stack('v', 'left', 'top'), {
    width: `352px`,
    height: `100%`,
    borderRight: `1px solid ${designTokens.PrimitivesColorsGray400}`,
    padding: `24px 16px`,
    gap: 15
})

import { FC, useEffect, useState } from "react"
import { useThinAir } from "../../../clients/Thinair/useThinAir"
import { LabeledInput } from "../../../primitives/LabeledInput/LabeledInput"



export const ComponentNameInput: FC<{
    selectedComponentId: string
}> = ({
    selectedComponentId
}) => {

    // Queries
    const selectedComponent = useThinAir(['components', selectedComponentId], 'GET')
    const updateComponent = useThinAir(['components', selectedComponentId], 'POST')
    // State
    const [componentName, updateComponentName] = useState(selectedComponent.data.component.componentName)
    useEffect(() => {
        updateComponentName(selectedComponent.data.component.componentName) 
    }, [selectedComponent.data.component.componentName])
    return (
        <LabeledInput
            label='Component Name' 
            onSubmit={async (value) => {
                await updateComponent.mutateAsync({
                    componentName: value
                })
            }} 
            submitButton={true}
            controlledState={[componentName, updateComponentName]}
        />
    )
}
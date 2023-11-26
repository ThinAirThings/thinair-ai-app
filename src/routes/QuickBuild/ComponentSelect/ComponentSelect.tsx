import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { stack } from "../../../styles/stackStyle";
import * as designTokens from '../../../style-dictionary-dist/variables'
import { useStateStore } from "../../../storage/useStateStore";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { reactSelectStyles } from "../../../styles/reactSelect.theme";

export const ComponentSelect: FC<{}> = ({}) => {
    // Mutations
    const createComponent = useThinAir(['components'], 'POST')
    // Queries
    const components = useThinAir(['components'], 'GET')
    // State
    const [selectedComponentId, updateSelectedComponentId] = useStateStore((state) => [
        state.selectedComponentId, 
        state.updateSelectedComponentId
    ])
    useEffect(() =>{
        const componentIds = Object.keys(components.data.components)
        !selectedComponentId && updateSelectedComponentId(
            componentIds.length > 0 ? componentIds[0] : null
        )
    }, [components.data])
    return (
        <ComponentSelectContainer>
            <span>Create/Select Component</span>
            <CreatableSelect 
                placeholder="Create or Select Component"
                value={selectedComponentId ? {
                    label: (components.data.components[selectedComponentId]?.componentName),
                    value: selectedComponentId
                } : undefined}
                isLoading={createComponent.isPending}
                {...reactSelectStyles}
                onCreateOption= {(inputValue) => {
                    createComponent.mutate({
                        componentName: inputValue
                    }, {
                        onSuccess: ({componentId}) => {
                            updateSelectedComponentId(componentId)
                        }
                    })
                }}
                onChange={(selectedOption) => {
                    if (selectedOption?.value === 'create-new-component') {
                        createComponent.mutate({
                            componentName: 'New Component'
                        }, {
                            onSuccess: ({componentId}) => {
                                updateSelectedComponentId(componentId)
                            }
                        })
                        return
                    }
                    updateSelectedComponentId(selectedOption?.value??'')
                }}
                options={[
                    {label: '+ Create Component', value: 'create-new-component'},
                    ...Object.entries(components.data.components).map(([componentId, {componentName}]) => ({
                        label: componentName,
                        value: componentId
                    }))
                ]}
            />
        </ComponentSelectContainer>
    );
}

const ComponentSelectContainer = styled.div(stack('v', 'left', 'top'), {
    width: '100%',
    gap: 5,
    '>span': {
        ...designTokens.FontInputHeader
    }
})
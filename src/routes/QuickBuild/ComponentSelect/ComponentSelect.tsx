import styled from "@emotion/styled";
import { FC } from "react";
import CreatableSelect from "react-select/creatable";
import { stack } from "../../../styles/stackStyle";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateComponent } from "./hooks/useCreateComponent";
import { useComponentList } from "./hooks/useComponentList"; 
import * as designTokens from '../../../style-dictionary-dist/variables'
import { useStateStore } from "../../../storage/useStateStore";

export const ComponentSelect: FC<{}> = ({}) => {
    // Mutations
    const createComponent = useCreateComponent()
    const componentList = useComponentList()
    const queryClient = useQueryClient()
    const updateSelectedComponentId = useStateStore((state) => state.updateSelectedComponentId)
    return (
        <ComponentSelectContainer>
            <span>Create/Select Component</span>
            <CreatableSelect 
                isClearable={true}
                placeholder="Create or Select Component"
                isLoading={createComponent.isPending || componentList.isFetching}
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: '100%',
                    }),
                }}
                onCreateOption= {(inputValue) => {
                    createComponent.mutate(inputValue, {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ['component-list'] })
                        }
                    })
                }}
                onChange={(selectedOption) => {
                    updateSelectedComponentId(selectedOption?.value??null)
                }}
                options={componentList.data?.components.map((component) => ({
                    label: component.componentName,
                    value: component.componentId
                }))}
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
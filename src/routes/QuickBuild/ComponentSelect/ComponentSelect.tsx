import styled from "@emotion/styled";
import { FC, useState } from "react";
import * as designTokens from '../../../style-dictionary-dist/variables'
import CreatableSelect from "react-select/creatable";
import { stack } from "../../../styles/stackStyle";
import { useAuthentication } from "../../../air-systems/Authentication.configure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateComponent } from "./hooks/useCreateComponent";
import { useComponentList } from "./hooks/useComponentList";



export const ComponentSelect: FC<{}> = ({

}) => {
    // Mutations
    const createComponent = useCreateComponent()
    const componentList = useComponentList()
    const queryClient = useQueryClient()
    return (
        <ComponentSelectContainer>
            <span>Create/Select Component</span>
            <CreatableSelect 
                isLoading={createComponent.isPending}
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
                options={componentList.data?.components.map((component) => ({
                    label: component.componentName,
                    value: component.componentName
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
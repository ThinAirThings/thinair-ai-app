import styled from "@emotion/styled";
import { FC, useState } from "react";
import * as designTokens from '../../../style-dictionary-dist/variables'
import CreatableSelect from "react-select/creatable";
import { stack } from "../../../styles/stackStyle";
import { useAuthentication } from "../../../air-systems/Authentication.configure";
import { useMutation } from "@tanstack/react-query";



export const ComponentSelect: FC<{}> = ({

}) => {
    // Mutations
    const {protectedFetch} = useAuthentication()
    const createComponent = useMutation({
        mutationFn: (componentName: string) => {
            return protectedFetch(`/api/components`, {
                method: 'POST',
                body: JSON.stringify({
                    name: componentName
                })
            })
        }
    }) 
    // State
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    return (
        <ComponentSelectContainer>
            <span>Create/Select Component</span>
            <CreatableSelect 
                isLoading={isLoading}
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: '100%',
                    }),
                }}
                onCreateOption= {(inputValue) => {
                    setIsLoading(true);
                    setTimeout(() => {
                        // const newOption = createOption(inputValue);
                        setIsLoading(false);
                        // setOptions([...options, newOption]);
                    }, 1000);
                }}
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
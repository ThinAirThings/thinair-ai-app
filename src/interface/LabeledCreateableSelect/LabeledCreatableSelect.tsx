import styled from "@emotion/styled";
import { FC, useState } from "react";
import { stack } from "../../styles/stackStyle";
import * as designTokens from '../../style-dictionary-dist/variables'
import CreatableSelect from "react-select/creatable";



export const LabeledCreatableSelect: FC<{
    label: string
}> = ({
    label
}) => {

    // State
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    return (
        <LabeledReactSelectContainer>
            <span>{label}</span>
            <CreatableSelect styles={{
                container: (provided) => ({
                    ...provided,
                    width: '100%',
                })
            }}/>
        </LabeledReactSelectContainer>
    );
}

const LabeledReactSelectContainer = styled.div(stack('v', 'left', 'top'), {
    width: '100%',
    gap: 5,
    '>span': {
        ...designTokens.FontInputHeader
    }
})
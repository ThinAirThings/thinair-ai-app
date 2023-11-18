import { FC, useState } from "react";
import styled from "styled-components";
import { stackStyle } from "../../styles/stackStyle";
import { OptionRow } from "./OptionRow";
import { useSearchBoxSelectionControls } from "./hooks/useSearchBoxSelectionControls";
import classNames from "classnames";
import { StaticIndex } from "../../air-systems/StaticIndex";


const optionKeys = (Object.keys(StaticIndex) as Array<keyof typeof StaticIndex>)

export const OptionsTable: FC = () => {
    // State
    const [optionIndex, setOptionIndex] = useState(0)

    // Hooks
    useSearchBoxSelectionControls(optionKeys, optionIndex, setOptionIndex)
    return (
        <Container>
            <span className="header">Options</span>
            <OptionsList>
                {optionKeys
                    .map((nodeType, index) => 
                        <OptionRow 
                            key={nodeType} 
                            nodeType={nodeType}
                            className={classNames({
                                active: index === optionIndex
                            })}
                        />
                    )
                }
            </OptionsList>
        </Container>
    )
}

const Container = styled.div`
    ${stackStyle('v', 'left', 'top')}
    gap: 10px;
    width: 100%;
    >.header {
        ${({theme})=>theme.textStyles}
        color: white;
        font-size: 20px;
    }
`

const OptionsList = styled.div`
    ${stackStyle('v', 'left', 'top')}
    padding-left: 20px;
    width: 100%;
    gap: 5px;
`


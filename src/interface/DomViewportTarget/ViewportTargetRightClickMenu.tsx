import styled from "styled-components"
import { stackStyle } from "../../styles/stackStyle"
import { StaticIndex } from "../../air-systems/StaticIndex"


export const ViewportTargetRightClickMenu = () => {
    return (
        <OptionList>
            {[...StaticIndex.values()].map(({displayName}) => {
                return (
                    <div key={displayName} className="option">
                        Create {displayName}
                    </div>
                )
            })}
        </OptionList>
    )
}

const OptionList = styled.div`
    ${stackStyle('v', 'left', 'top')}
    width: 100%;
    >.option {
        width: 100%;
        ${stackStyle('h', 'left', 'center')}
        padding: 5px 7px;
        height: 30px;
        background-color: ${({theme}) => theme.dark.white};
        border-radius: 5px;
        cursor: pointer;
        >*{
            user-select: none;
        }
        &:hover {
            background-color: ${({theme}) => theme.dark.whiteSecondary};
        }
    }
`
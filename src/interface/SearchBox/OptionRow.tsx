import { FC } from "react";
import styled from "styled-components";
import { stackStyle } from "../../styles/stackStyle";
import { StaticIndex } from "../../air-systems/StaticIndex";



export const OptionRow: FC<{
    nodeType: keyof typeof StaticIndex,
    className: string
}> = ({
    nodeType,
    className
}) => {
    const Icon = StaticIndex[nodeType].Icon
    return (
        <Row
            className={className}
        ><Icon/>{StaticIndex[nodeType].displayName}</Row>
    )
}

const Row = styled.span`
    ${stackStyle('h', 'left', 'center')}
    gap: 10px;
    ${({theme})=>theme.textStyles}
    font-size: 16px;
    padding: 5px 7px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    >svg {
        stroke: ${({theme})=>theme.dark.whiteSecondary};
        width: 20px;
        height: auto;
    }
    &:hover, &.active {
        background-color: ${({theme})=>theme.dark.fgHover};
    }
`
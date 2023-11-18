import { FC } from "react";
import styled from "styled-components";
import { stackStyle } from "../../styles/stackStyle";
import { List } from "react-feather";


export const TopLeftTag: FC = () => {
    return (
        <Container>
            <img src="/assets/logos/thinair-black.svg"/>
            <span>Project Name</span>
            <List/>
        </Container>
    )
}

const Container = styled.div`
    ${stackStyle('h', 'left', 'center')}
    position: absolute;
    top: 10px;
    left: 10px;
    height: 38px;
    background-color: ${({theme}) => theme.dark.white};
    padding: 0 10px;
    gap: 10px;
    ${({theme})=>theme.boxStyles(theme.zIndex.interface)}
    cursor: pointer;
    >*{
        user-select: none;
    }
    img {
        width: 22px;
        height: auto;
    }
    span {
        ${stackStyle('h', 'left', 'center')}
        padding: 0 10px;
        border-left: 1px dotted ${({theme}) => theme.dark.black};
        ${({theme})=>theme.textStyles}
        color: ${({theme}) => theme.dark.black};
        font-size: 16px;
    }
    svg {
        stroke: white;
    }
`
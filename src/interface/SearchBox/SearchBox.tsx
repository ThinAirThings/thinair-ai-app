import { FC } from "react";
import styled from "styled-components";
import { stackStyle } from "../../styles/stackStyle";
import { SearchBar } from "./SearchBar";
import { OptionsTable } from "./OptionsTable";



export const SearchBox: FC = () => {
    return (
        <Container>
            <OptionsTable/>
        </Container>
    )
}

const Container = styled.div`
    ${stackStyle('v', 'left', 'top')}
    position: absolute;
    width: 540px;
    height: 300px;
    top: 50%;
    left: 50%;
    padding: 20px;
    gap: 10px;
    transform: translate(-50%, -90%);
    background-color: ${({theme}) => theme.dark.fg};
    ${({theme})=>theme.boxStyles(theme.zIndex.interface)}
`
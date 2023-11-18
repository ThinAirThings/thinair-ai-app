import { FC } from "react";
import styled from "styled-components";
import { stackStyle } from "../../styles/stackStyle";
import { Search } from "react-feather";
import { CleanInput } from "../../styles/CleanInput";



export const SearchBar: FC = () => {
    return (
        <Container>
            <Search/>
            <InputBar placeholder="What do you need?"/>
        </Container>
    )
}


const Container = styled.div`
    ${stackStyle('h', 'left', 'center')}
    padding-bottom: 10px;
    gap: 10px;
    border-bottom: 1px solid ${({theme}) => theme.dark.white};
    width: 100%;
    svg {
        width: 24px;
        height: auto;
        stroke: ${({theme}) => theme.dark.white};
    }
`

const InputBar = styled(CleanInput)`
    color: ${({theme}) => theme.dark.white};
    &::placeholder {
        color: ${({theme}) => theme.dark.white}80;
    }
`
import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../styles/stackStyle";
import * as designTokens from '../../style-dictionary-dist/variables'
import { shadowTokenToString } from "../../styles/shadowTokenToString";
import { Search } from "react-feather";


export const Searchbar: FC<{}> = ({}) => {
    return (
        <SearchbarContainer>
            <SearchInputContainer>
                <Search color={designTokens.PrimitivesColorsTextSecondary}/>
                <form>
                    <input placeholder="Search for a component..."/>
                </form>
            </SearchInputContainer>
        </SearchbarContainer>
    )
}

export const SearchbarContainer = styled.div(stack('v', 'left', 'top'), {
    padding: 10,
    width: '560px',
    height: '44px',
    borderRadius: designTokens.PrimitivesBorderRadius,
    boxShadow: shadowTokenToString([
        designTokens.EffectElevation50,
        designTokens.EffectElevation51
    ]),
})

export const SearchInputContainer = styled.div(stack('h', 'left', 'center'), {
    width: '100%',
    height: '100%',
    gap: 10,
    '>form': {
        width: '100%',
        height: '100%',
        '>input': {
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
        }
    }
})
import { FC, useEffect } from "react";
import { StyledButton } from "../../styles/StyledButton";
import { useAuthentication } from "../../air-systems/Authentication.configure";
import { useNavigate } from "react-router-dom";
import { stack } from "../../styles/stackStyle";
import styled from "@emotion/styled";
import * as designTokens from '../../style-dictionary-dist/variables'

export const AuthenticationView: FC = () => {
    const {accessToken} = useAuthentication()
    const navigate = useNavigate()
    useEffect(() => {
        accessToken && navigate('/')
    }, [accessToken])
    return (
        <FullScreen>
            <AuthBlock>
                <img className="logo" src="/assets/logos/thinair-full-white.svg"/>
                <ButtonRow>
                    <ButtonLink color="white" href={import.meta.env.VITE_COGNITO_CLIENT_HOSTEDUI_URL_SIGN_IN}>Sign in</ButtonLink>
                    <ButtonLink color="white" href={import.meta.env.VITE_COGNITO_CLIENT_HOSTEDUI_URL_SIGN_IN.replace('login', 'signup')}>Register</ButtonLink>
                </ButtonRow>
            </AuthBlock>
        </FullScreen>
    )
}

const ButtonLink = StyledButton.withComponent('a')
const FullScreen = styled.div`
    ${stack('v', 'center', 'center')}
    width: 100%;
    height: 100%;
    padding: 10px;
    gap: 10px;
    background-color: ${designTokens.PrimitivesColorsBlack};
`

const AuthBlock = styled.div`
    ${stack('v', 'center', 'center')}
    width: 100%;
    height: 100%;
    padding: 71px 234px;
    gap: 50px;
    &>.logo {
        width: 406px;
        height: auto;
    }
`

const ButtonRow = styled.div`
    ${stack('h', 'center', 'center')}
    gap: 25px;
    &>button {
        width: 100px;
    }
`


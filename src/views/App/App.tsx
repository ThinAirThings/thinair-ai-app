import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../styles/stackStyle";
import { AppNavigation } from "../../interface/AppNavigation/AppNavigation";
import { PageLayout } from "../../interface/PageLayout/PageLayout";



export const App: FC = () => {
    return (
        <AppContainer>
            <AppNavigation/>
            <PageLayout/>
        </AppContainer>
    )
}

const AppContainer = styled.div(stack('h', 'left', 'top'), {
    width: '100%',
    height: '100%',
})
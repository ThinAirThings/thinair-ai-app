import styled from "@emotion/styled";
import { FC } from "react";
import { stack } from "../../styles/stackStyle";
import * as designTokens from '../../style-dictionary-dist/variables'
import { Outlet } from "react-router-dom";


export const PageLayout: FC = () => {
    return (
        <PageMain>
            <PageHeader>
                <PageTitle>Quick Build</PageTitle>
            </PageHeader>
            <PageBody>
                <Outlet/>
            </PageBody>
        </PageMain>
    )
}

const PageMain = styled.div(stack('v', 'left', 'top'), {
    width: `100%`,
    height: `100%`,
})

const PageHeader = styled.div(stack('h', 'left', 'center'), {
    width: `100%`,
    padding: `24px 12px`,
    borderBottom: `1px solid ${designTokens.ColorsGray400}`
})

const PageTitle = styled.span({
    ...designTokens.FontPageTitle
})

const PageBody = styled.div(stack('h', 'left', 'top'), {
    width: `100%`,
    height: `100%`,
})

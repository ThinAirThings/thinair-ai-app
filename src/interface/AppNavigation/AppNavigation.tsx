import styled from "@emotion/styled"
import * as designTokens from '../../style-dictionary-dist/variables'
import { useState } from "react"
import { Flex, Heading} from "@radix-ui/themes"
import {Link, useLocation} from 'react-router-dom'
import { CubeIcon, GearIcon } from "@radix-ui/react-icons"
import { useTheme } from "@emotion/react"

export const AppNavigation = () => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const {pathname} = useLocation()
    const theme = useTheme()
    return (
        <AppNavigationRoot
            isCollapsed={isCollapsed}
            onMouseOver={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <Flex width={'100%'} style={{gridColumn: '1/2', height: '24px'}} mb='5'>
                <img src="/assets/logos/thinair-white.svg" style={{
                    width: 34,
                    height: 'auto'
                }}/>
            </Flex>
            <NavigationLinkRow
                to="/components"
                isActive={pathname.includes('/components')}
            >
                <CubeIcon
                    width={28}
                    height={28}
                />
                <StyledNavigationText 
                    weight={'medium'}
                    size={'3'}
                    isActive={pathname.includes('/components')}
                >Components</StyledNavigationText>
            </NavigationLinkRow>
            <NavigationLinkRow
                to="/settings"
                isActive={pathname.includes('/manage')}
                style={{gridRow: '-1'}}
            >
                <GearIcon
                    width={28}
                    height={28}
                />
                <StyledNavigationText 
                    weight={'medium'}
                    size={'3'}
                    isActive={pathname.includes('/settings')}
                >Settings</StyledNavigationText>
            </NavigationLinkRow>
        </AppNavigationRoot>

    )
}

const AppNavigationRoot = styled.div<{isCollapsed: boolean}>(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: '35px 1fr',
    gridTemplateRows: 'auto repeat(2, auto) 1fr',
    alignContent: 'start',
    height: `100%`,
    padding: `16px 12px`,
    gap: 10,
    borderRight: `1px solid ${theme.colors.neutralBorders7}`,
    transition: 'width 0.2s ease-in-out',
    overflow: 'hidden'
}), ({isCollapsed}) => isCollapsed ? ({
    width: designTokens.PrimitivesLayoutNavWidthClosed,
    gridTemplateColumns: '35px 0',
}) : ({
    width: designTokens.PrimitivesLayoutNavWidthOpen,
    gridTemplateColumns: '35px 1fr',
}))

const NavigationLinkRow = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({theme, isActive}) => ({
    display: 'grid',
    gridColumn: `1/3`,
    gridTemplateColumns: 'subgrid',
    whiteSpace: 'nowrap',
    placeItems: 'center',
    justifyItems: 'start',
    '>svg': {
        justifySelf: 'center',
        color: isActive ? theme.colors.accentSolid10 : theme.colors.neutralSolid10,
    }
}))

const StyledNavigationText = styled(Heading, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({theme, isActive}) => ({
    color: isActive ? theme.colors.neutralText12 : theme.colors.neutralText11,
}))


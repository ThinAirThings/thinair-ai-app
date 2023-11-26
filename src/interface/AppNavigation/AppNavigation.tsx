import styled from "@emotion/styled"
import { stack } from "../../styles/stackStyle"
import * as designTokens from '../../style-dictionary-dist/variables'
import { Settings, Zap } from "react-feather"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"



export const AppNavigation = () => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const {pathname} = useLocation()
    return (
        <AppNavigationContainer 
            isCollapsed={isCollapsed}
            onMouseOver={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <HeaderAndMenuContainer>
                <AppNavigationHeader><img src="/assets/logos/thinair-black.svg"/></AppNavigationHeader>
                <AppNavigationMenu>
                    <AppNavigationMenuItem 
                        to={"/quick-build"} 
                        isCollapsed={isCollapsed}
                        isActive={pathname.includes('quick-build')}
                        state={{pageTitle: 'Quick Build'}}
                    ><Zap/><span>Quick Build</span></AppNavigationMenuItem>
                </AppNavigationMenu> 
            </HeaderAndMenuContainer>

            <AppNavigationMenuItem
                to={"/settings"} 
                isCollapsed={isCollapsed}
                isActive={pathname.includes('settings')}
                state={{pageTitle: 'Settings'}}
            ><Settings/><span>Settings</span></AppNavigationMenuItem>
        </AppNavigationContainer>
    )
}


const AppNavigationContainer = styled.div<{isCollapsed: boolean}>(stack('v', 'left', 'distribute'), {
    width: 58,
    height: `100%`,
    padding: `16px 12px`,
    gap: 10,
    borderRight: `1px solid ${designTokens.PrimitivesColorsGray400}`,
    transition: 'width 0.2s ease-in-out',
}, ({isCollapsed}) => isCollapsed ? ({
    width: 58,
}) : ({
    width: 200,
}))

const HeaderAndMenuContainer = styled.div(stack('v', 'left', 'top'))
const AppNavigationHeader = styled.div(stack('v', 'center', 'center'), {
    paddingBottom: 10,
    '>img': {
        width: 34,
        height: 'auto'
    }
})

const AppNavigationMenu = styled.div(stack('v', 'center', 'top'), {
    gap: 10
})

const AppNavigationMenuItem = styled(Link, {
    shouldForwardProp: (prop) => 
        prop !== 'isCollapsed' &&    // Required to prevent isCollapsed from being passed to the DOM (https://stackoverflow.com/questions/74575427/why-does-passing-custom-props-to-a-mui-styled-element-cause-a-dom-element-warnin)
        prop !== 'isActive',
})<{isCollapsed: boolean, isActive: boolean}>(stack('h', 'left', 'center'), {
    padding: 6,
    cursor: 'pointer',
    gap: 7,
    overflow: 'hidden',
    '>svg': {
        width: 24,
        height: 24,
        stroke: designTokens.PrimitivesColorsGray600,
    },
    '&:hover>svg,&:hover>span': {
        color: designTokens.PrimitivesColorsGray800,
        stroke: designTokens.PrimitivesColorsGray800,
    },
    '>span': {
        ...designTokens.FontInputHeader,
        whiteSpace: 'nowrap',
        color: designTokens.PrimitivesColorsGray600,
        transition: 'opacity 0.2s ease-in-out'
    }
}, ({isCollapsed, isActive}) => {
    return ({
        '>span': {
            display: isCollapsed ? 'none' : 'block',
            opacity: isCollapsed ? 0 : 1,
        },
        '>svg': {
            stroke: isActive ? designTokens.PrimitivesColorsPrimary300 : designTokens.PrimitivesColorsGray600,
        }
    }) 
})
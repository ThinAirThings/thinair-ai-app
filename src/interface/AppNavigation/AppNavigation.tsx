import styled from "@emotion/styled"
import { stack } from "../../styles/stackStyle"
import * as designTokens from '../../style-dictionary-dist/variables'
import { Zap } from "react-feather"
import { useState } from "react"
import { Link } from "react-router-dom"



export const AppNavigation = () => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <AppNavigationContainer 
            isCollapsed={isCollapsed}
            onMouseOver={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <AppNavigationHeader><img src="/assets/logos/thinair-black.svg"/></AppNavigationHeader>
            <AppNavigationMenu>
                <AppNavigationMenuItem to={"/quick-build"} isCollapsed={isCollapsed}><Zap/><span>Quick Build</span></AppNavigationMenuItem>
            </AppNavigationMenu> 
        </AppNavigationContainer>
    )
}


const AppNavigationContainer = styled.div<{isCollapsed: boolean}>(stack('v', 'left', 'top'), {
    width: 58,
    height: `100%`,
    padding: `16px 12px`,
    gap: 10,
    borderRight: `1px solid ${designTokens.ColorsGray400}`,
    transition: 'width 0.2s ease-in-out',
}, ({isCollapsed}) => isCollapsed ? ({
    width: 58,
}) : ({
    width: 200,
}))

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

const AppNavigationMenuItem = styled(Link)<{isCollapsed: boolean}>(stack('h', 'left', 'center'), {
    padding: 6,
    cursor: 'pointer',
    gap: 7,
    '>svg': {
        width: 24,
        height: 24,
        stroke: designTokens.ColorsGray600,
    },
    '&:hover>svg,&:hover>span': {
        color: designTokens.ColorsGray800,
        stroke: designTokens.ColorsGray800,
    },
    '>span': {
        ...designTokens.FontInputHeader,
        whiteSpace: 'nowrap',
        color: designTokens.ColorsGray600,
        transition: 'opacity 0.2s ease-in-out'
    }
}, ({isCollapsed}) => {
    return isCollapsed ? ({
        '>span': {
            opacity: 0,
        }
    }) : ({
        '>span': {
            opacity: 1,
        }
    })
})
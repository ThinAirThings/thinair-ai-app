import styled from '@emotion/styled'
import { FC } from 'react'
import {Link as RouterLink, useLocation} from 'react-router-dom'
import { stack } from '../../styles/stackStyle'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { useTheme } from '@emotion/react'
import { Text } from '@radix-ui/themes'

export const NavigationLink: FC<{
    toPath: string
    isCollapsed: boolean
}> = ({
    toPath, 
    isCollapsed,
    ...props
}) => {
    const theme = useTheme()
    const {pathname} = useLocation()
    const isActive = pathname.includes(toPath)
    return (
            <NavigationLinkContainer
                to={toPath}
                isCollapsed={isCollapsed}
                isActive={isActive}
                {...props}
            >
                <LightningBoltIcon 
                    width={20}
                    height={20}
                    color={isActive ? theme.colors.accent['10']: theme.colors.neutral['10']}
                />
                <Text 
                    highContrast
                    color='gray'
                >Quick Build</Text>
            </NavigationLinkContainer>
    )
}

const NavigationLinkContainer = styled(RouterLink, {
    shouldForwardProp: (prop) => 
        prop !== 'isCollapsed' &&    // Required to prevent isCollapsed from being passed to the DOM (https://stackoverflow.com/questions/74575427/why-does-passing-custom-props-to-a-mui-styled-element-cause-a-dom-element-warnin)
        prop !== 'isActive',
})<{isCollapsed: boolean, isActive: boolean}>(stack('h', 'left', 'center'), ({isCollapsed, isActive}) => ({
    padding: 6,
    cursor: 'pointer',
    gap: 7,
    overflow: 'hidden',
    '>span': {
        whiteSpace: 'nowrap',
        display: isCollapsed ? 'none' : 'block',
        opacity: isCollapsed ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
    }
}))

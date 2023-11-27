import { useTheme } from "@emotion/react";
import { Box, Flex } from "@radix-ui/themes";
import { FC } from "react";
import { Oval } from "react-loader-spinner";



export const ThinAirLoadingSpinner:FC<
    Parameters<typeof Oval>[0]
> = ({...props}) => {
    const theme = useTheme()
    return (
        <Flex position={'relative'} align={'center'} justify={'center'}>
            <Oval
                color={theme.colors.accent[10]}
                secondaryColor={theme.colors.neutral[10]}
                height={75}
                width={75}
                strokeWidth="2"
                {...props}
            />
            <img 
                src="/assets/logos/thinair-white.svg"
                style={{
                    position: 'absolute',
                    width: '50%',
                    height: '50%',
                    transform: 'translate(-2px, -1px)'
                }}
            />
        </Flex>

    )
}
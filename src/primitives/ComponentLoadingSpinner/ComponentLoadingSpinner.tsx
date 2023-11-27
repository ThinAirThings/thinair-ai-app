import { useTheme } from "@emotion/react";
import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";




export const ComponentLoadingSpinner:FC<
    Parameters<typeof RotatingLines>[0]
> = ({...props}) => {
    const theme = useTheme()
    return (
        <RotatingLines
            strokeColor={theme.colors.accent[10]}
            width={'16'}
            strokeWidth="2"
            {...props}
        />
    )
}
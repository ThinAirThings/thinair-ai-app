import { FC } from "react"
import { StyledButton } from "../../styles/StyledButton"
import { Oval } from "react-loader-spinner"



export const Button: FC<{
    isLoading?: boolean,
} & Parameters<typeof StyledButton>[0]> = ({
    isLoading,
    ...props
}) => {
    return (
        <StyledButton {...props}>
            {isLoading ? <Oval
                height={20}
                width={20}
            /> : props.children}
        </StyledButton>
    )
}
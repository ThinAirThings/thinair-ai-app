import { FC } from "react"
import { Oval } from "react-loader-spinner"
import { StyledButton } from "../../styles/StyledButton"
// import { Button as RadixButton} from "@radix-ui/themes"


export const Button: FC<{
    isLoading?: boolean,
} & Parameters<typeof StyledButton>[0]> = ({
    isLoading,
    ...props
}) => {
    return (
        <Button {...props}>
            {isLoading ? <Oval
                height={16}
                width={16}
            /> : props.children}
        </Button>
    )
}
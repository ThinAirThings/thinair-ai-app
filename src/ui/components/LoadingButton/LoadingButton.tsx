import { ElementRef, FC, forwardRef } from "react";
import { Button, buttonPropDefs } from "@radix-ui/themes";
import { ExtractComponentParameters } from "../../helpers/extract-component-parameters";
import { ComponentLoadingSpinner } from "../ComponentLoadingSpinner/ComponentLoadingSpinner";


interface LoadingButtonProps 
    extends ExtractComponentParameters<typeof Button> {
        isLoading?: boolean
}
export const LoadingButton = forwardRef<ElementRef<'button'>, LoadingButtonProps>((props, ref) => {
    const {isLoading, ...buttonProps}  = props
    return (
        <Button
            ref={ref}
            {...buttonProps}
        >
            {props.isLoading 
                ? <ComponentLoadingSpinner
                    parentType="button"
                    {...props}
                />
                : props.children
            }
        </Button>
    )
})
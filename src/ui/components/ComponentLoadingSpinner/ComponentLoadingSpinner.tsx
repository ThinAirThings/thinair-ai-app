import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ExtractComponentParameters } from "../../helpers/extract-component-parameters";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import styled from "@emotion/styled";
import { getCssVariable } from "../../helpers/get-css-variable";
import { useTheme } from "@emotion/react";



interface ComponentLoadingSpinnerProps 
    extends ExtractComponentParameters<typeof RotatingLines>,
        ExtractComponentParameters<typeof LoadingButton>  {
    parentType: 'button'
}
export const ComponentLoadingSpinner:FC<ComponentLoadingSpinnerProps> = ({...props}) => {
    const theme = useTheme()
    const configurations: Record<ComponentLoadingSpinnerProps['parentType'], 
        Record<NonNullable<ComponentLoadingSpinnerProps['variant']>, {
            strokeColor: string
        }
    >> = {
        'button': {
            'ghost': {
                strokeColor: theme.colors.neutralContrast
            },
            'solid': {
                strokeColor: theme.colors.accentContrast,
            },
            'soft': {
                strokeColor: theme.colors.neutralContrast
            },
            'surface': {
                strokeColor: theme.colors.neutralContrast
            },
            'outline': {
                strokeColor: theme.colors.neutralContrast
            },
            'classic': {
                strokeColor: theme.colors.accentContrast
            }
        },
    }
    return (
        <RotatingLines
            width={'16'}
            strokeWidth="2"
            strokeColor={configurations[props.parentType][props.variant??'solid'].strokeColor}
        />
    )
}

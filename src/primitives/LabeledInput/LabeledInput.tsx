import styled from "@emotion/styled";
import { FC, HTMLAttributes, useState } from "react";
import { stack } from "../../styles/stackStyle";
import * as designTokens from '../../style-dictionary-dist/variables'


export const LabeledInput: FC<{
    label: string,
    onSubmit: (value: string) => Promise<void> | void,
    controlledState?: [string, (value: string) => void],
    submitButton?: boolean
} & Omit<HTMLAttributes<HTMLInputElement>, 'onSubmit'>> = ({
    label,
    onSubmit,
    controlledState,
    submitButton,
}) => {
    const [isUpdating, setIsUpdating] = useState(false)
    return (
        <LabeledInputContainer>
            <form onSubmit={async (event) => {
                setIsUpdating(true)
                event.preventDefault()
                const formData = new FormData(event.target as HTMLFormElement)
                await onSubmit(formData.get('inputValue') as string)
                setIsUpdating(false)
            }}>
                <label>{label}</label>
                <InputRow>
                    <input 
                        {...controlledState && {
                            value: controlledState[0],
                            onChange: (event) => {
                                controlledState[1](event.target.value)
                            }
                        }}
                        name={"inputValue"} 
                    />
                    {/* {submitButton && <Button variant="solid" type='submit'>Save</Button>} */}
                </InputRow>
            </form>
        </LabeledInputContainer>
    )
}

const LabeledInputContainer = styled.div(stack('v', 'left', 'top'), {
    gap: 5,
    width: '100%',
    '>form': {
        width: '100%'
    },
    '>form>label': {
        ...designTokens.FontInputHeader
    }
})

const InputRow = styled.div(stack('h', 'left', 'center'), {
    gap: 5,
    width: '100%',
    '>input': {
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        padding: '7px',
        border: `1px solid ${designTokens.PrimitivesBorderPrimary}`,
        transition: 'border 0.2s ease-in-out',
        '&:hover': {
            border: `1px solid ${designTokens.PrimitivesBorderPrimaryActive}`
        }
    }
})
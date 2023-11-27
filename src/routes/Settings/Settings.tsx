import styled from "@emotion/styled";
import { FC, useState } from "react";
import { stack } from "../../styles/stackStyle";
import * as designTokens from '../../style-dictionary-dist/variables'
import { StyledButton } from "../../styles/StyledButton";
import { useThinAir } from "../../clients/Thinair/useThinAir";
import { ApiKeySourceType } from "aws-cdk-lib/aws-apigateway";
import { Check, Copy } from "react-feather";


export const Settings: FC = () => {
    // State
    const [showCheckMark, setShowCheckMark] = useState(false)
    // Mutations
    const apiKeysMutation = useThinAir(['authorize', 'api_keys'], 'POST')
    // Queries
    const apiKeys = useThinAir(['authorize', 'api_keys'], 'GET')
    console.log(apiKeys.data)
    return (
        <SettingsContainer>
            <ApiKeysHeader>API Keys</ApiKeysHeader>
            <ApiKeysList>
                {apiKeys.data.apiKeys.map((apiKey) => (
                    <ApiKeyRow key={apiKey}>
                        <span>{apiKey}</span>
                        <CopyIconContainer
                            showCheckmark={showCheckMark}
                            onClick={() => {
                                setShowCheckMark(true)
                                navigator.clipboard.writeText(apiKey)
                                setTimeout(() => {
                                    setShowCheckMark(false)
                                }, 1000)
                            }}
                        >
                            {showCheckMark ? <Check color={designTokens.PrimitivesColorsGreen400}/> : <Copy/>}
                        </CopyIconContainer>
                    </ApiKeyRow>
                ))}
            </ApiKeysList>
            <StyledButton color="black"
                onClick={() => apiKeysMutation.mutate(undefined)} 
            >
                Generate New API Key
            </StyledButton>
        </SettingsContainer>
    )
}

const SettingsContainer = styled.div(stack('v', 'left', 'top'), {
    padding: 20,
    gap: 10
})
const ApiKeysList = styled.div(stack('v', 'left', 'top'), {
    borderRadius: designTokens.PrimitivesBorderRadius,
    border: `1px solid ${designTokens.PrimitivesColorsGray400}`,
})
const ApiKeyRow = styled.div(stack('h', 'distribute', 'center'), {
    height: 32,
    padding: `5px 7px`,
    gap: 10,
    '>span': {
        color: designTokens.PrimitivesColorsTextDefault,
        fontSize: 14
    }
})
const CopyIconContainer = styled.div<{showCheckmark: boolean}>(stack('h', 'center', 'center'), {
    width: 28,
    height: 28,
    borderRadius: designTokens.PrimitivesBorderRadius,
    border: `1px solid ${designTokens.PrimitivesColorsGray300}`,
    cursor: 'pointer',
    ':hover': {
        backgroundColor: designTokens.PrimitivesColorsGray200,
    },
    '>svg': {
        width: 16,
        height: 16,
        stroke: designTokens.PrimitivesColorsTextDefault,
    }
}, ({showCheckmark}) => showCheckmark && ({
    backgroundColor: designTokens.PrimitivesColorsGreen200,
    border: `1px solid ${designTokens.PrimitivesColorsGreen700}`,
    ':hover': {
        backgroundColor: designTokens.PrimitivesColorsGreen200,
    },
    '>svg': {
        stroke: designTokens.PrimitivesColorsGreen700,
    }
}))
const ApiKeysHeader = styled.span({
    ...designTokens.FontSectionHeader
})
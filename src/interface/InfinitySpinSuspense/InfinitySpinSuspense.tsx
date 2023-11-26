import styled from "@emotion/styled"
import { stack } from "../../styles/stackStyle"
import { InfinitySpin } from "react-loader-spinner"
import * as designTokens from '../../style-dictionary-dist/variables'
import { FC, ReactNode, Suspense } from "react"


export const InfinitySpinSuspense: FC<{
    width: number,
    children?: ReactNode
}> = ({
    width,
    children
}) => {
    return (
        <Suspense fallback={
            <InfinitySpinSuspenseContainer>
                <InfinitySpin
                    color={designTokens.PrimitivesColorsPrimary500}
                    width={width.toString()}
                />
            </InfinitySpinSuspenseContainer>
        }>
            {children}
        </Suspense>
    )
}

const InfinitySpinSuspenseContainer = styled.div(stack('v', 'center', 'center'), {
    width: '100%',
})
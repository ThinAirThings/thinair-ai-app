import styled from "@emotion/styled"
import { Flex } from "@radix-ui/themes"



export const Preview = () => {
    return (
        <PreviewRoot>
            <iframe src="https://intelligent-search.dev.thinair.cloud"/>
            {/* <StyledIFrame src="https://blueprintapparelcompany.com/"/> */}
        </PreviewRoot>
    )
}

const PreviewRoot = styled(Flex)(() => ({
    width: '100%',
    height: '100%',
}))

const StyledIFrame = styled.iframe(() => ({
    width: '100%',
    height: '100%',
}))

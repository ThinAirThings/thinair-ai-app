import { Card, Code, Flex, Inset, Text } from "@radix-ui/themes"
import { useStateStore } from "../../../storage/useStateStore"

export const Deploy = () => {
    const selectedComponentId = useStateStore(state => state.selectedComponentId)
    const componentTheme = useStateStore(state => state.componentTheme);
    return (
        <Card mt='6'>
            <Inset>
                <Flex height='100%'>
                    <Flex direction={'column'} align="center" justify={'center'} p={'3'} css={(theme) => ({
                        backgroundColor: theme.colors.neutral6,
                        width: 100
                    })}>
                        <img src="/assets/logos/rocket-icon.svg" style={{
                            width: 50
                        }}/>
                    </Flex>
                    <Flex py={'2'} px='4' direction='column'>
                        <Text weight='medium'>Code Snippet</Text>
                        <Text size='2' color="gray">Copy and paste this code into your website's html where you want it to appear.</Text>
                        <Card mt="2">
                            <Code variant="ghost" >
                                {`
                                <iframe 
                                    src="https://intelligent-search.dev.thinair.cloud/?componentId=${selectedComponentId}&accent-color=${componentTheme.accentColor}&mode=${componentTheme.mode}"
                                    style="border: none; width: 420px; height: 150px;"
                                ></iframe>
                                `}
                            </Code>
                        </Card>

                    </Flex>
                </Flex>
            </Inset>
        </Card>
    )
}
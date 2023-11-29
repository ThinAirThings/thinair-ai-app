import { Button, Flex, TextArea } from "@radix-ui/themes"
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton"


export const SystemPrompt = () => {
    return (
        <Flex direction={'column'} width={'100%'} height={'100%'} gap={'3'}>
            <TextArea 
                placeholder="Define what you want this component to do..."
            />
            <LoadingButton size={'2'} css={{width: '100px'}}>Save</LoadingButton>
        </Flex>
    )
}
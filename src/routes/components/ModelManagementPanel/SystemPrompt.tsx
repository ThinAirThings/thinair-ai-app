import { Button, Flex, Text, TextArea } from "@radix-ui/themes"
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton"
import * as Form from "@radix-ui/react-form";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { useStateStore } from "../../../storage/useStateStore";
import { ElementRef, FC, Suspense, forwardRef } from "react";
import { RotatingLines } from "react-loader-spinner";

export const SystemPrompt = () => {
    // State
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    const updateComponent = useThinAir(['components', selectedComponentId??''], 'POST')
    return (
        <Form.Root 
            onSubmit={async (event) => {
                event.preventDefault()
                const data = Object.fromEntries(new FormData(event.currentTarget)) as {
                    systemPrompt: string
                }
                await updateComponent.mutateAsync({
                    updates: {
                        systemPrompt: data.systemPrompt
                    }
                })
            }}
        >
            <Flex direction={'column'} width={'100%'} height={'100%'} gap={'3'}>
                <Form.Field name="systemPrompt" asChild>
                    <Flex direction={'column'} gap={'2'}>
                        <Suspense fallback={<RotatingLines
                            strokeColor="var(--sky-10)"
                            width='30'
                            strokeWidth="2"
                        />}>
                            {selectedComponentId && <SystemPromptTextArea selectedComponentId={selectedComponentId}/>}
                        </Suspense>
                        <Form.Message match="valueMissing" asChild>
                            <Text color="crimson">Please enter a system prompt.</Text>
                        </Form.Message>
                    </Flex>
                </Form.Field>
                <Form.Submit asChild>
                    <LoadingButton 
                        isLoading={updateComponent.isPending}
                        size={'2'} 
                        css={{width: '100px'}}
                    >Save</LoadingButton>
                </Form.Submit>
            </Flex>
        </Form.Root>
    )
}

export const SystemPromptTextArea = forwardRef<ElementRef<'textarea'>, {selectedComponentId: string}>(({
    selectedComponentId
}, forwardedRef) => {
    // Data
    const component = useThinAir(['components', selectedComponentId], 'GET')
    return (
        <Form.Control asChild>
            <TextArea 
                ref={forwardedRef}
                defaultValue={component.data.component.systemPrompt??undefined}
                required
                placeholder="Define what you want this component to do..."
            />
        </Form.Control>
    )
})
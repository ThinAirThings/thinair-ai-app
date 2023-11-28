import { FC, useState } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import * as Form from "@radix-ui/react-form";
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton";
import { useStateStore } from "../../../storage/useStateStore";
// import { }
export const CreateComponentDialog:FC<{
    dialogState: ReturnType<typeof useState<boolean>>
}> = ({
    dialogState: [dialog, setDialogOpen],
}) => {
    // Mutations
    const createComponent = useThinAir(['components'], 'POST')
    const updateSelectedComponentId = useStateStore((state) => state.updateSelectedComponentId)
    return (
        <Dialog.Root 
            open={dialog} onOpenChange={setDialogOpen}
        >
            <Dialog.Content>
                <Dialog.Title>Create Component</Dialog.Title>
                <Form.Root onSubmit={async (event) => {
                    event.preventDefault()
                    const data = Object.fromEntries(new FormData(event.currentTarget)) as {
                        componentName: string
                    }
                    const response = await createComponent.mutateAsync(data)
                    updateSelectedComponentId(response.componentId)
                    setDialogOpen(false)
                }}>
                    <Flex direction={'column'} gap={'4'}>
                        <Form.Field name="componentName" asChild>
                            <Flex direction={'column'} gap={'2'}>
                                <Text weight={'medium'}>Component Name</Text>
                                <Form.Control asChild>
                                    <TextField.Input
                                        required
                                        placeholder={'Component Name'}
                                        width={'100%'}
                                    />
                                </Form.Control>
                                <Form.Message match="valueMissing" asChild>
                                    <Text color="crimson">Please enter a value for this field.</Text>
                                </Form.Message>
                            </Flex>
                        </Form.Field>
                    
                        <Flex gap={'3'} justify={'end'}>
                            <Dialog.Close>
                                <Button variant="outline" color='red'>Cancel</Button>
                            </Dialog.Close>
                            
                            <Form.Submit asChild>
                                <LoadingButton
                                    isLoading={createComponent.isPending}
                                >{`Create Component`}
                                </LoadingButton>
                            </Form.Submit>
                        </Flex>
                    </Flex>
                </Form.Root>
            </Dialog.Content>
        </Dialog.Root>
    )
}
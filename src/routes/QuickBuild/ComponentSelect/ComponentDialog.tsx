import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { FC } from "react";
import { useThinAir } from "../../../clients/Thinair/useThinAir";




export const ComponentDialog: FC<{
    selectedComponentId: string
}> = ({
    selectedComponentId
}) => {
    // Queries
    const components = useThinAir(['components'], 'GET')
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <IconButton>
                    <Pencil1Icon/>
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Edit Component Details</Dialog.Title>
                <Flex direction={'column'} gap={'4'}>
                    <Flex direction={'column'} gap={'2'}>
                        <Text weight={'medium'}>Rename Component</Text>
                        <TextField.Input
                            placeholder={'Component Name'}
                            defaultValue={components.data.components[selectedComponentId].componentName}
                            width={'100%'}
                        />
                    </Flex>
                    <Flex gap={'3'} justify={'end'}>
                        <Dialog.Close>
                            <Button variant="soft">Cancel</Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
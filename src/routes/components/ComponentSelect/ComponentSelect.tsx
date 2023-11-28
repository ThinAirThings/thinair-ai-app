import { FC, Suspense, useEffect, useState } from "react";
import { useStateStore } from "../../../storage/useStateStore";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { Button, Flex, Select, Text, Dialog, IconButton, TextField } from "@radix-ui/themes";
import { Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import * as Form from "@radix-ui/react-form";
import { ComponentLoadingSpinner } from "../../../ui/components/ComponentLoadingSpinner/ComponentLoadingSpinner";
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton";
export const ComponentSelect: FC = () => {
    // Queries
    const components = useThinAir(['components'], 'GET')
    // State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedComponentId, updateSelectedComponentId] = useStateStore((state) => [
        state.selectedComponentId,
        state.updateSelectedComponentId
    ])
    // Mutations
    const updateComponent = useThinAir(['components', selectedComponentId!], 'POST')
    // Effects
    useEffect(() =>{
        const componentIds = Object.keys(components.data.components)
        !selectedComponentId && updateSelectedComponentId(
            componentIds.length > 0 ? componentIds[0] : null
        )
    }, [components.data])
    return (
        <Flex direction={'column'} width="100%" gap={'3'}>
            <Flex justify={'between'} align={'stretch'}>
                <Text weight="bold">Component Select</Text>
                <LoadingButton
                    highContrast
                    size={'1'}
                    color="gray"
                    onClick={() => components.refetch()}
                >+ Create New</LoadingButton>
            </Flex>
            
            <Flex direction={'row'} gap={'3'}>
                <Flex direction={'column'} width={'100%'}>
                    <Select.Root value={selectedComponentId!} onValueChange={updateSelectedComponentId}>
                        <Select.Trigger placeholder="Loading..."/>
                        <Select.Content side={'bottom'} position={'popper'}>
                            {Object.entries(components.data.components).map(([componentId, {componentName}]) => 
                                <Select.Item 
                                    key={componentId}
                                    value={componentId}
                                >{componentName}</Select.Item>
                            )}
                        </Select.Content>
                    </Select.Root>
                </Flex>
                {selectedComponentId && <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <Dialog.Trigger>
                        <IconButton>
                            <Pencil2Icon/>
                        </IconButton>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Form.Root onSubmit={async (event) => {
                            event.preventDefault()
                            const data = Object.fromEntries(new FormData(event.currentTarget)) as {
                                componentName: string
                            }
                            await updateComponent.mutateAsync(data)
                            setDialogOpen(false)
                        }}>
                            <Dialog.Title>Edit Component Details</Dialog.Title>
                            <Form.Field name="componentName" asChild>
                                <Flex direction={'column'} gap={'2'}>
                                    <Text weight={'medium'}>Rename Component</Text>
                                    <Form.Control asChild>
                                        <TextField.Input
                                            required
                                            placeholder={'Component Name'}
                                            defaultValue={components.data.components[selectedComponentId].componentName}
                                            width={'100%'}
                                        />
                                    </Form.Control>
                                    <Form.Message match="valueMissing" asChild>
                                        <Text color="crimson">Please enter a value for this field.</Text>
                                    </Form.Message>
                                </Flex>
                            </Form.Field>
                            <Flex direction={'column'} gap={'4'}>
                                <Flex gap={'3'} justify={'end'}>
                                    <Dialog.Close>
                                        <Button variant="soft">Cancel</Button>
                                    </Dialog.Close>
                                    
                                    <Form.Submit asChild>
                                        <LoadingButton
                                            isLoading={updateComponent.isPending}
                                        >Save
                                        </LoadingButton>
                                    </Form.Submit>
                                </Flex>
                            </Flex>
                        </Form.Root>
                    </Dialog.Content>
                </Dialog.Root>}
            </Flex>
        </Flex>
    );
}


const SelectContent = () => {
    // Queries
    const components = useThinAir(['components'], 'GET')
    const [selectedComponentId, updateSelectedComponentId] = useStateStore((state) => [
        state.selectedComponentId,
        state.updateSelectedComponentId
    ])
    useEffect(() =>{
        const componentIds = Object.keys(components.data.components)
        !selectedComponentId && updateSelectedComponentId(
            componentIds.length > 0 ? componentIds[0] : null
        )
    }, [components.data])
    return (
        <Select.Content side={'bottom'} position={'popper'}>
            {Object.entries(components.data.components).map(([componentId, {componentName}]) => 
                <Select.Item 
                    key={componentId}
                    value={componentId}
                >{componentName}</Select.Item>
            )}
        </Select.Content>
    )
}
import { Blockquote, Button, Dialog, Flex, Heading, IconButton, Popover, Separator, Switch, Table, Text, TextField, DropdownMenu, Card } from "@radix-ui/themes";
import { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton";
import { InfoCircledIcon, MagnifyingGlassIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import Papa from 'papaparse';
import {useImmer} from 'use-immer'
import * as Form from "@radix-ui/react-form";
import { useThinAir } from "../../../clients/Thinair/useThinAir";
import { useStateStore } from "../../../storage/useStateStore";
import { convertFileToBase64 } from "../../../helpers/file-utils";
import { useAuthentication } from "../../../air-systems/Authentication.configure";
import { useQueryClient } from "@tanstack/react-query";

export const FileUploadDialog: FC<{
    dialogState: ReturnType<typeof useState<boolean>>
}> = ({
    dialogState: [dialog, setDialogOpen],
}) => {
    const queryClient = useQueryClient()
    // State
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    const [displayFormat, setDisplayFormat] = useState<string>('')
    // Mutations
    const {protectedFetch} = useAuthentication()
    const uploadToVecdb = useThinAir(['components', selectedComponentId??'', 'vecdb'], 'POST')
    // Fake Text field ref
    const [csvData, updateCsvData] = useImmer<Array<{
        columnName: string
        includeInSearch: boolean
        firstItem: string
    }> | null>(null)
    // Dropzone
    const {
        getInputProps,
        getRootProps,
        isFileDialogActive,
        acceptedFiles
    } = useDropzone({
        onDrop: async (acceptedFiles) => {
            // Parse the CSV file
            Papa.parse<Record<string,any>>(acceptedFiles[0] as any, {
                header: true,
                complete: (results) => {
                    updateCsvData(results.meta.fields!.map((columnName) => ({
                        columnName,
                        includeInSearch: false,
                        includeInOutput: {
                            include: false,
                            order: 0
                        },
                        firstItem: results.data[0][columnName]
                    })))
                }
            });
        }
    })
    return (
        <>
            <input {...getInputProps()} />
            <Dialog.Root
                open={dialog} onOpenChange={setDialogOpen}
            >
                <Dialog.Content size='3' css={{
                    minWidth: '80%'
                }}>
                    <Dialog.Title>Upload Data</Dialog.Title>
                    <Dialog.Description color='gray'>
                        Upload a CSV file to be used for intelligent search.
                    </Dialog.Description>
                    <Flex direction={'column'} pt='3' position='relative'>
                        {csvData
                            ? <Flex direction={'column'} gap='3'> 
                                <Text weight={'medium'} color='green'>CSV Added Successfully!</Text>
                                <Separator size='4'/>
                                <Text weight='bold' color='gray'>Select the columns you want to include</Text>
                                <Table.Root>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell/>
                                            {csvData.map(({columnName}) => (
                                                <Table.ColumnHeaderCell key={columnName}>
                                                    {columnName}
                                                </Table.ColumnHeaderCell>
                                            ))}
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row align='center'>
                                            <Table.Cell css={{minWidth: '120px'}}>
                                                <Text size='2' weight='bold'>
                                                    <Flex gap='2' align='center'>
                                                        <Popover.Root>
                                                            <Popover.Trigger>
                                                                <IconButton size='1' variant='ghost'>
                                                                    <InfoCircledIcon/>
                                                                </IconButton>
                                                            </Popover.Trigger>
                                                            <Popover.Content>
                                                                <Text size='2' css={{maxWidth: '300px'}}>
                                                                    Include columns that you believe will be relevant to the LLM's search.
                                                                </Text>
                                                            </Popover.Content>
                                                        </Popover.Root> 
                                                        Include in Search
                                                    </Flex>
                                                </Text>

                                            </Table.Cell>
                                            {csvData.map(({columnName, includeInSearch}, i) => (
                                                <Table.Cell key={`${columnName}`} >
                                                    <Switch 
                                                        size='1'
                                                        radius="full"
                                                        checked={includeInSearch}
                                                        onCheckedChange={(checked) => {
                                                            updateCsvData(draft => {
                                                                draft![i].includeInSearch = checked
                                                            })
                                                        }}
                                                    />
                                                </Table.Cell>
                                            ))}
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Text size='2' weight='bold'>Row Example</Text>
                                            </Table.Cell>
                                            {csvData.map(({columnName, firstItem}) => (
                                                <Table.Cell key={`${columnName}`}>
                                                    <Text size='2' >{firstItem}</Text>
                                                </Table.Cell>
                                            ))}
                                        </Table.Row>
                                    </Table.Body>
                                </Table.Root>
                                <Flex direction={'column'} gap='1'>
                                    <Heading size='3'>Response Format</Heading>
                                    <Text color='gray'>
                                        <Flex gap='3' align={'center'}>
                                            Configure the response format for the search.
                                            <Popover.Root>
                                                <Popover.Trigger>
                                                    <IconButton size='1' variant='ghost' color='sky'>
                                                        <InfoCircledIcon/>
                                                    </IconButton>
                                                </Popover.Trigger>
                                                <Popover.Content>
                                                    <Flex direction={'column'} gap='1'>
                                                        <Text weight='bold'>Example:</Text>
                                                        <Text size='3' color='gray'>If you uploaded a CSV of catalog data with columns "BrandName", "Title", "Category" and the first row of the CSV looked like: </Text>
                                                        <Table.Root css={{width: '400px'}}>
                                                            <Table.Header>
                                                                <Table.Row>
                                                                    <Table.ColumnHeaderCell>brandName</Table.ColumnHeaderCell>
                                                                    <Table.ColumnHeaderCell>title</Table.ColumnHeaderCell>
                                                                    <Table.ColumnHeaderCell>category</Table.ColumnHeaderCell>
                                                                </Table.Row>
                                                            </Table.Header>
                                                            <Table.Body>
                                                                <Table.Row>
                                                                    <Table.Cell>Apple</Table.Cell>
                                                                    <Table.Cell>iPhone 12</Table.Cell>
                                                                    <Table.Cell>Electronics</Table.Cell>
                                                                </Table.Row>
                                                            </Table.Body>
                                                        </Table.Root>
                                                        <Text size='3' color='gray'>
                                                            <Flex gap='3'>
                                                                Then you could configure the response format to be:
                                                                <Blockquote color='blue'>{`{{category}} - {{brandName}} {{title}}`}</Blockquote>
                                                            </Flex>
                                                        </Text>
                                                        <Text>Which would result in an output from the search box that looks like:</Text>
                                                        <TextField.Root 
                                                            size='1'
                                                            radius="full" 
                                                            css={{width: '100%'}}
                                                        >
                                                            <TextField.Slot>
                                                                <MagnifyingGlassIcon/>
                                                            </TextField.Slot>
                                                            <TextField.Input />
                                                        </TextField.Root>
                                                        <Card size='1'>
                                                            <Text>Electronics - Apple iPhone 12</Text>
                                                        </Card>
                                                    </Flex>
                                                </Popover.Content>
                                            </Popover.Root>
                                        </Flex>
                                    </Text>
                                    <Form.Root onSubmit={async (event) => {
                                        event.preventDefault()
                                        const formData = Object.fromEntries(new FormData(event.currentTarget)) as {
                                            displayFormat: string
                                        }
                                        const response = await uploadToVecdb.mutateAsync({
                                            fileName: acceptedFiles[0].name,
                                            fileData: await convertFileToBase64(acceptedFiles[0]),
                                            subset: csvData.filter(({includeInSearch}) => includeInSearch).map(({columnName}) => columnName),
                                            displayFormat: formData.displayFormat
                                        })
                                        queryClient.invalidateQueries({queryKey: ['components', selectedComponentId, 'task', response.task_id,]})
                                        queryClient.invalidateQueries({queryKey: ['components', selectedComponentId, 'data_files']})
                                        setDialogOpen(false)
                                        let statusCheck = true
                                        let failCount = 0
                                        // while (statusCheck && response.task_id !== 'undefined'){
                                        //     const statusResponse = await protectedFetch(`https://api.dev.thinair.cloud/v1/components/${selectedComponentId}/task/${response.task_id}`) as {
                                        //         status: string,
                                        //         task_id: string
                                        //     }
                                        //     if (statusResponse.task_id === 'undefined'){
                                        //         statusCheck = false
                                        //     }
                                        //     // const statusJson = await statusResponse.json()
                                        //     if (statusResponse.status.includes('Failed')){
                                        //         failCount += 1
                                        //     }
                                        //     if (failCount > 3){
                                        //         statusCheck = false
                                        //     }
                                        //     await new Promise((resolve) => setTimeout(resolve, 2000))
                                        // }
                                    }}>
                                        <Flex direction={'column'} gap='2'>
                                            <Form.Field name="displayFormat">
                                                <TextField.Root>
                                                    <Form.Control asChild>
                                                        <TextField.Input
                                                            value={displayFormat}
                                                            onChange={(event) => setDisplayFormat(event.currentTarget.value)}
                                                            required
                                                            size='1'
                                                            placeholder={`{{${csvData[0].columnName}}} - {{${csvData[1].columnName}}} {{${csvData[2].columnName}}}`}
                                                        />
                                                    </Form.Control>
                                                </TextField.Root>
                                                <Form.Message 
                                                    match={(value) => {
                                                        const regex = /{{(.*?)}}/g;
                                                        let match
                                                        while((match = regex.exec(value)) !== null) {
                                                            const stringInsideBrackets = match[1].trim()
                                                            return !csvData.some(({columnName}: {columnName: string}) => columnName === stringInsideBrackets)
                                                        }
                                                        return true
                                                    }} 
                                                    asChild
                                                >
                                                    <Text color="crimson">Please enter the correct syntax. Check out the information tooltip above for an example!</Text>
                                                </Form.Message>
                                            </Form.Field>
                                            <Flex gap='2' css={{alignSelf: 'flex-end'}}>
                                                <Form.Submit asChild>
                                                    <LoadingButton
                                                        css={{width:'150px', alignSelf:'flex-end'}}
                                                        isLoading={uploadToVecdb.isPending}
                                                        size='1'
                                                    >Save</LoadingButton>
                                                </Form.Submit>

                                                <Button 
                                                    css={{width: '150px'}}
                                                    size='1' 
                                                    color='red' 
                                                    variant='outline'
                                                    onClick={() => updateCsvData(() => null)}
                                                ><TrashIcon/>Clear</Button>
                                            </Flex>
                                        </Flex>
                                    </Form.Root>
                                </Flex>
                            </Flex>
                            : <LoadingButton
                                css={{width:'150px'}}
                                isLoading={isFileDialogActive}
                                size='1'
                                {...getRootProps()}
                            ><UploadIcon/>Upload CSV File</LoadingButton>
                        }
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}
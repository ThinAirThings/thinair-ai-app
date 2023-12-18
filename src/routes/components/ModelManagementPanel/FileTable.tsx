import { Badge, Flex, Switch, Table } from "@radix-ui/themes"
import { FC, Suspense, useEffect } from "react"
import { useThinAir } from "../../../clients/Thinair/useThinAir"
import { useStateStore } from "../../../storage/useStateStore"
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton"
import { TrashIcon } from "@radix-ui/react-icons"
import { RotatingLines } from "react-loader-spinner"
import { useTheme } from "@emotion/react"
import { useQueryClient } from "@tanstack/react-query"



export const FileTable = () => {
    const theme = useTheme()
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>File Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>File Type</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>File Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Include</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Suspense fallback={
                <Table.Body>
                    <Table.Row>
                        {Array.from({length: 5}).map((_, i) => (
                            <Table.Cell key={i}>
                                <RotatingLines
                                    strokeColor={theme.colors.neutralContrast}
                                    width={'16'}
                                />
                            </Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Body>  
            }>
                {selectedComponentId && <FileTableBody selectedComponentId={selectedComponentId}/>}
            </Suspense>
        </Table.Root>
    )
}

const FileTableBody: FC<{
    selectedComponentId: string
}> = ({
    selectedComponentId
}) => {
    const dataFiles = useThinAir(['components', selectedComponentId, 'data_files'], 'GET')
    return (
        <Table.Body>
            {Object.entries(dataFiles.data.dataFiles).map(([fileId, {fileName, fileType, include, taskId}]) => (
                <FileTableRow
                    key={fileId}
                    selectedComponentId={selectedComponentId}
                    fileId={fileId}
                    fileName={fileName}
                    taskId={taskId}
                    fileType={fileType}
                    include={include}
                />
            ))}
        </Table.Body>
    )
}

const FileTableRow: FC<{
    selectedComponentId: string
    fileId: string
    fileName: string
    fileType: string
    taskId: string
    include: boolean
}> = ({
    selectedComponentId,
    fileId,
    fileName,
    fileType,
    taskId,
    include
}) => {
    const queryClient = useQueryClient()
    // Mutations
    const deleteDataFile = useThinAir(['components', selectedComponentId, 'data_files', fileId], 'DELETE')
    const updateDataFile = useThinAir(['components', selectedComponentId, 'data_files', fileId], 'POST')
    const fileStatus = useThinAir(['components', selectedComponentId, 'task', taskId], 'GET') 
    useEffect(() => {
        if (!fileStatus.data) return
        if (!(fileStatus.data.status.includes('Finished'))) {
            setTimeout(() => {
                queryClient.invalidateQueries({queryKey: ['components', selectedComponentId, 'task', taskId]})
            }, 1000);
        }
    }, [fileStatus.data, fileStatus.isFetching])
    return (
        <Table.Row key={fileId}>
            <Table.Cell>{fileName}</Table.Cell>
            <Table.Cell><Badge color="yellow" radius='full'>{fileType}</Badge></Table.Cell>
            <Table.Cell>{fileStatus.data?.status.includes("Finished")
                ? <Badge color="green" radius='full'>Ready</Badge>
                : fileStatus.data?.status.includes("Failed")
                    ? <Badge color="red" radius='full'>Failed to Process</Badge>
                    : <Badge color="yellow" radius='full'>Processing <RotatingLines
                        strokeColor="var(--yellow-10)"
                        width={'12'}
                    /></Badge>
            }</Table.Cell>
            <Table.Cell><Switch 
                radius="full"
                checked={updateDataFile.variables?.include ?? include} 
                onCheckedChange={async (checked) => {
                    await updateDataFile.mutateAsync({
                        include: checked
                    })
                }}
            /></Table.Cell>
            <Table.Cell>
                <LoadingButton variant="outline" color="red"
                    isLoading={deleteDataFile.isPending}
                    onClick={async () => {
                        await deleteDataFile.mutateAsync(undefined)
                    }}
                ><TrashIcon/>Delete</LoadingButton>
            </Table.Cell>
        </Table.Row>
    )
}
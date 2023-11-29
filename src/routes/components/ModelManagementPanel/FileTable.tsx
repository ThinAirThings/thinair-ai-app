import { Badge, Flex, Switch, Table } from "@radix-ui/themes"
import { FC, Suspense } from "react"
import { useThinAir } from "../../../clients/Thinair/useThinAir"
import { useStateStore } from "../../../storage/useStateStore"
import { LoadingButton } from "../../../ui/components/LoadingButton/LoadingButton"
import { TrashIcon } from "@radix-ui/react-icons"
import { RotatingLines } from "react-loader-spinner"
import { useTheme } from "@emotion/react"



export const FileTable = () => {
    const theme = useTheme()
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>File Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>File Type</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Include</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Suspense fallback={
                <Table.Body>
                    <Table.Row>
                        {Array.from({length: 4}).map((_, i) => (
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
    console.log(dataFiles.data.dataFiles)
    return (
        <Table.Body>
            {Object.entries(dataFiles.data.dataFiles).map(([fileId, {fileName, fileType}]) => (
                <Table.Row key={fileId}>
                    <Table.Cell>{fileName}</Table.Cell>
                    <Table.Cell><Badge color="yellow" radius='full'>{fileType}</Badge></Table.Cell>
                    <Table.Cell><Switch radius="full"
                        defaultChecked={true} 
                    /></Table.Cell>
                    <Table.Cell>
                        <LoadingButton variant="outline" color="red">
                            <TrashIcon/>
                            Delete
                        </LoadingButton>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    )
}
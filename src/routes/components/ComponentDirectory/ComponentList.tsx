import { Flex, Table } from "@radix-ui/themes"
import { useThinAir } from "../../../clients/Thinair/useThinAir"
import { useEffect } from "react"
import { useStateStore } from "../../../storage/useStateStore"
import { ComponentRow } from "./ComponentRow"

export const ComponentList = () => {
    // Queries
    const components = useThinAir(['components'], 'GET')
    // State
    const [selectedComponentId, updateSelectedComponentId] = useStateStore((state) => [
        state.selectedComponentId,
        state.updateSelectedComponentId
    ])
    // Effects
    useEffect(() =>{
        const componentIds = Object.keys(components.data.components)
        !selectedComponentId && updateSelectedComponentId(
            componentIds.length > 0 ? componentIds[0] : null
        )
    }, [components.data])
    return (
        <Flex direction='column' width={'100%'}> 
            <Table.Root>
                <Table.Body>
                    {Object.entries(components.data.components).map(([componentId, {componentName}]) => 
                        <ComponentRow
                            key={componentId}
                            componentId={componentId}
                            componentName={componentName}
                        />
                    )}
                </Table.Body>
            </Table.Root>
        </Flex>
    )
}

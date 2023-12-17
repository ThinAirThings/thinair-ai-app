import styled from "@emotion/styled"
import { ContextMenu, Table, Text, TextField } from "@radix-ui/themes"
import classNames from "classnames"
import { FC, useEffect, useRef, useState } from "react"
import { useStateStore } from "../../../storage/useStateStore"
import { useThinAir } from "../../../clients/Thinair/useThinAir"
import { RotatingLines } from "react-loader-spinner"
import { useTheme } from "@emotion/react"
import { fromEvent } from "rxjs"
import * as Form from "@radix-ui/react-form";



export const ComponentRow: FC<{
    componentId: string
    componentName: string
}> = ({
    componentId,
    componentName
}) => {
    const theme = useTheme()
    // Refs
    const inputRef = useRef<HTMLInputElement>(null)
    // State
    const [selectedComponentId, updateSelectedComponentId] = useStateStore((state) => [
        state.selectedComponentId,
        state.updateSelectedComponentId
    ])
    const [isRenameActive, setIsRenameActive] = useState(false)
    useEffect(() => {
        isRenameActive && inputRef.current?.focus()
    }, [isRenameActive])
    // Mutations
    const updateComponent = useThinAir(['components', selectedComponentId??''], 'POST')
    const deleteComponent = useThinAir(['components', selectedComponentId??''], 'DELETE')
    // Effects
    useEffect(() => {
        if (!isRenameActive) return
        const keyboardCancelSubscription = fromEvent<KeyboardEvent>(document, 'keydown').subscribe((event) => {
            if (event.key === 'Escape') {
                setIsRenameActive(false)
            }
        })
        const mouseCancelSubscription = fromEvent<MouseEvent>(document, 'pointerdown').subscribe((event) => {
            if (event.target instanceof HTMLElement && event.target.tagName.toLowerCase() !== 'input') {
                setIsRenameActive(false)
            }
        })
        return () => {
            keyboardCancelSubscription.unsubscribe()
            mouseCancelSubscription.unsubscribe()
        }
    }, [isRenameActive])
    return (
        <ContextMenu.Root
            onOpenChange={(open) => {
                open && updateSelectedComponentId(componentId)
            }}
        >
            <ContextMenu.Trigger>
                <ComponentRowRoot
                    className={classNames({
                        isActive: selectedComponentId === componentId
                    })}
                    onClick={() => updateSelectedComponentId(componentId)}
                >
                    <Table.Cell
                        onDoubleClick={() => setIsRenameActive(true)}
                        css={isRenameActive ? {
                            padding: '7px 2px 6px 4px'
                        }: {}}
                    >{
                        isRenameActive
                            ? <Form.Root onSubmit={async (event) => {
                                event.preventDefault()
                                const data = Object.fromEntries(new FormData(event.currentTarget)) as {
                                    componentName: string
                                }
                                await updateComponent.mutateAsync({
                                    updates: {
                                        componentName: data.componentName
                                    }
                                })
                                setIsRenameActive(false)
                            }}>
                                <Form.Field name="componentName" asChild>
                                    <TextField.Root>
                                        <Form.Control asChild>
                                            <TextField.Input
                                                ref={inputRef}
                                                required
                                                autoFocus
                                                size={'2'} 
                                                defaultValue={componentName}
                                                onFocus={(event) => event.currentTarget.select()}
                                            />
                                        </Form.Control>
                                        <TextField.Slot>
                                            {updateComponent.isPending && <RotatingLines
                                                width={'16'}
                                                strokeColor={theme.colors.neutralContrast}
                                            />}
                                        </TextField.Slot>
                                    </TextField.Root>
                                </Form.Field>
                            </Form.Root>
                        : deleteComponent.isPending
                            ? <RotatingLines
                                width={'16'}
                                strokeColor={theme.colors.dangerSolid10}
                            /> 
                        : <Text css={{userSelect: 'none'}}>{componentName}</Text>
                    }</Table.Cell>
                </ComponentRowRoot>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item 
                    onSelect={() => setIsRenameActive(true)}
                >
                    Rename
                </ContextMenu.Item>
                <ContextMenu.Separator/>
                <ContextMenu.Item 
                    color={'red'} 
                    onSelect={() => deleteComponent.mutate(undefined)}
                >
                    {`Delete ${componentName}`}
                </ContextMenu.Item>

            </ContextMenu.Content>
        </ContextMenu.Root>
    )
}

const ComponentRowRoot = styled(Table.Row)(({theme}) => ({
    cursor: 'pointer',
    '&.isActive': {
        backgroundColor: theme.colors.neutral4
    },
    '&:hover': {
        backgroundColor: theme.colors.neutral4
    }
}))
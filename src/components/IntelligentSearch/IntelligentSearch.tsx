import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, DropdownMenu, TextField } from "@radix-ui/themes";
import { FC, useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as Form from "@radix-ui/react-form";
import { RotatingLines } from "react-loader-spinner";
import { slateDark } from "@radix-ui/colors";
export const IntelligentSearch: FC = () => {
    // State
    const [resultsOpen, setResultsOpen] = useState(false)
    const [fakeQuerying, setFakeQuerying] = useState(false)
    const [textFieldRef, setTextFieldRef] = useState<HTMLDivElement | null>(null)
    return (
        <Box position={'relative'}>
            <DropdownMenu.Root 
                open={resultsOpen} 
                onOpenChange={setResultsOpen}
            >
                <Form.Root onSubmit={(event) => {
                    event.preventDefault()
                    setFakeQuerying(true)
                    setTimeout(() => {
                        setFakeQuerying(false)
                        setResultsOpen(true)
                    }, 250);
                }}>
                    <Form.Field name="query" asChild>
                        <TextField.Root 
                            ref={setTextFieldRef}
                            radius="full" 
                            css={{width: 400}}
                        >
                            <TextField.Slot>
                                <MagnifyingGlassIcon/>
                            </TextField.Slot>
                            <Form.Control asChild>
                                <TextField.Input/>
                            </Form.Control>
                            <TextField.Slot>
                                {fakeQuerying && <RotatingLines 
                                    width={'16'}
                                    strokeColor={slateDark.slate10}
                                /> }
                            </TextField.Slot>
                        </TextField.Root>
                    </Form.Field>
                </Form.Root>
                <DropdownMenuPrimitive.Trigger css={{
                    position: 'absolute',
                    width: textFieldRef?.clientWidth,
                    top: textFieldRef?.clientHeight,
                }}/>
                <DropdownMenu.Content css={{width: textFieldRef?.clientWidth}}>
                    <DropdownMenu.Item>Item 1</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 2</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 3</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 4</DropdownMenu.Item>
                    <DropdownMenu.Item>Item 5</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>

    )
}

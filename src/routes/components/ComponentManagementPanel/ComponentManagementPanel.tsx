import styled from "@emotion/styled"
import { Flex, Heading, Tabs } from "@radix-ui/themes"
import { FC } from "react"
import { ExtractComponentParameters } from "../../../ui/helpers/extract-component-parameters"
import { Develop } from "./Develop"
import { Deploy } from "./Deploy"


export const ComponentManagementPanel: FC<
    ExtractComponentParameters<typeof ComponentManagementPanelRoot>
> = (props) => {
    return (
        <ComponentManagementPanelRoot 
            direction={'column'}
            {...props}
        >
            <Heading size={'3'}>Component Management</Heading>
            <Tabs.Root defaultValue="develop" css={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}>
                <Tabs.List>
                    <Tabs.Trigger value="develop">Develop</Tabs.Trigger>
                    {/* <Tabs.Trigger value="preview">Preview</Tabs.Trigger> */}
                    <Tabs.Trigger value="deploy">Deploy</Tabs.Trigger>
                    <Tabs.Trigger value="monitor">Monitor</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="develop" css={{height: '100%'}}>
                    <Develop/>
                </Tabs.Content>
                {/* <Tabs.Content value="preview" css={{height: '100%'}}>
                    <Preview/>
                </Tabs.Content> */}
                <Tabs.Content value="deploy" css={{height: '100%'}}>
                    <Deploy/>
                </Tabs.Content>
            </Tabs.Root>
        </ComponentManagementPanelRoot>
    )
}


export const ComponentManagementPanelRoot = styled(Flex)(() => ({
    gap: 3,
    padding: 10,
    width: '100%',
    height: '100%',
}))
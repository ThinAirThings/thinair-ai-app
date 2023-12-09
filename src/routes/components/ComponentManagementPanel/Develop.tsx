import { Flex } from "@radix-ui/themes"
import { useStateStore } from "../../../storage/useStateStore"
import { ThemeSelector } from "./ThemeSelector";
import { useEffect } from "react";
import { fromEvent } from "rxjs";


export const Develop = () => {
    // State
    const selectedComponentId = useStateStore(state => state.selectedComponentId);
    const componentTheme = useStateStore(state => state.componentTheme);
    useEffect(() => {
        const iframeSubscription = fromEvent<MessageEvent>(window, 'message').subscribe((event) => {
            console.log(event.data)
        })
        const keyboardSubscription = fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
            if (event.key === 'Escape') {
                window.postMessage({
                    method: 'closeResults'
                }, 'http://localhost:5174')
            }
        })
        return () => {
            iframeSubscription.unsubscribe()
            keyboardSubscription.unsubscribe()
        }
    }, [])
    return (
        <Flex 
            position='relative'
            direction={'column'} 
            width={'100%'} 
            height={'100%'} 
            gap={'3'}
            css={(theme) => ({
                padding: `0px 20% 0px 20%`,
                backgroundColor: componentTheme.mode === 'dark' ? theme.colors.neutral1 : 'white',
            })}
            justify={'center'}
            align={'center'}
        >
            <ThemeSelector/>
            <iframe 

                src={`http://localhost:5174/?componentId=${selectedComponentId}&accent-color=${componentTheme.accentColor}&mode=${componentTheme.mode}`} 
                style={{
                    width: '100%',
                    height: 'auto',
                    border: 'none',
                }}
            />
        </Flex>
    )
}



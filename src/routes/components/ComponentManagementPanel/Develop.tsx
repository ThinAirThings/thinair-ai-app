import { Button, Flex } from "@radix-ui/themes"
import { useStateStore } from "../../../storage/useStateStore"
import { ThemeSelector } from "./ThemeSelector";
import { useEffect, useState } from "react";
import { fromEvent } from "rxjs";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";


export const Develop = () => {
    // State
    const [showThemeSelector, setShowThemeSelector] = useState(true)
    const selectedComponentId = useStateStore(state => state.selectedComponentId);
    const componentTheme = useStateStore(state => state.componentTheme);
    useEffect(() => {
        const keyboardSubscription = fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
            if (event.key === 'Escape') {
                window.postMessage({
                    method: 'closeResults'
                }, 'https://intelligent-search.dev.thinair.cloud')
            }
        })
        return () => {
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
                overflow: 'hidden'
            })}
            justify={'center'}
            align={'center'}
        >
            <Button 
                variant="outline"
                color='orange'
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}
                onClick={() => setShowThemeSelector(showThemeSelector => !showThemeSelector)}
            >
                {<>{showThemeSelector ? <EyeOpenIcon/>:<EyeClosedIcon/>}Toggle Theme Selector</>}
            </Button>
            {showThemeSelector && <ThemeSelector/>}
            <iframe 
                src={`https://intelligent-search.dev.thinair.cloud/?componentId=${selectedComponentId}&accent-color=${componentTheme.accentColor}&mode=${componentTheme.mode}&nocache=12345`} 
                style={{
                    width: '100%',
                    height: 'auto',
                    border: 'none',
                }}
            />
        </Flex>
    )
}



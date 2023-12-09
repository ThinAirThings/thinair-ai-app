import styled from "@emotion/styled"
import { Card, Flex, Grid, Text, themeAccentColorsOrdered } from "@radix-ui/themes"
import { getCssVariable } from "../../../ui/helpers/get-css-variable"
import { useStateStore } from "../../../storage/useStateStore"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { fromEvent, takeUntil } from "rxjs"
import { mousePoint } from "@thinairthings/mouse-utils"




export const ThemeSelector = () => {
    const [
        accentColor,
        mode,
        setAccentColor,
        setMode
    ] = useStateStore(state => [
        state.componentTheme.accentColor,
        state.componentTheme.mode,
        state.updateComponentThemeAccentColor,
        state.updateComponentThemeMode
    ])

    const [position, setPosition] = useState({x: 10, y: 10})
    const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
    useEffect(() => {
        if (!containerRef) return
        const subscription = fromEvent<PointerEvent>(containerRef!, 'pointerdown')
        .subscribe((event) => {
            // Setup 
            const pointerDownPoint = mousePoint(event)
            const initialPosition = {...position}
            fromEvent<PointerEvent>(document.body, 'pointermove')
            .pipe(
                takeUntil(fromEvent<PointerEvent, void>(document.body, 'pointerup', {}, event => {
                    document.body.releasePointerCapture(event.pointerId)
                    // If Alt Key, Duplicate
                }))
            )
            .subscribe((event) => {
                const pointerMovePoint = mousePoint(event)
                setPosition({
                    x: initialPosition.x + (pointerMovePoint.x - pointerDownPoint.x),
                    y: initialPosition.y + (pointerMovePoint.y - pointerDownPoint.y)
                })
            })
        })
        return () =>{
            subscription.unsubscribe()
        }
    }, [position, containerRef])
    return <ThemeSelectorRoot
        ref={setContainerRef}
        style={{
            left: position.x,
            top: position.y
        }}
        css={{
            '& *': {
                userSelect: 'none'
            },
            cursor: 'move',
        }}
    >
        <Flex direction={'column'} gap='2'>
            <Text weight='medium'>Theme</Text>
            <Text size='2' color="gray">Accent Color</Text>
            <Grid columns={'13'} gap='2'>
                {themeAccentColorsOrdered.map((color) => {
                    return (
                        <label
                            key={color} 
                            className="rt-ThemePanelSwatch" 
                            onClick={() => setAccentColor(color)}
                            style={{
                                backgroundColor: getCssVariable(`--${color}-9`)
                            }}
                        >
                            <input 
                                checked={accentColor === color}
                                className="rt-ThemePanelSwatchInput" 
                                type="radio" 
                                name="accentColor" 
                                value={color}
                                onChange={() => {}}
                            />
                        </label>
                    )
                })}
            </Grid>
            <Text size='2' color="gray">Appearance</Text>
            <Grid columns={'2'} gap='2' css={{

            }}>
                <label className="rt-ThemePanelRadioCard"
                    onClick={() => setMode('light')}
                >
                    <input 
                        checked={mode === 'light'}
                        className="rt-ThemePanelRadioCardInput" 
                        type="radio" 
                        name="mode" 
                        value={mode}
                        onChange={() => {}}
                    />
                    <Flex justify={'center'} align={'center'} gap={'2'} height='6'>
                        <SunIcon/>
                        <Text size='1' weight='medium'>Light</Text>
                    </Flex>
                </label>
                <label className="rt-ThemePanelRadioCard"
                    onClick={() => setMode('dark')}
                >
                    <input 
                        checked={mode === 'dark'}
                        onChange={() => {}}
                        className="rt-ThemePanelRadioCardInput" 
                        type="radio" 
                        name="mode" 
                        value={mode}
                    />
                    <Flex justify={'center'} align={'center'} gap={'2'} height='6'>
                        <MoonIcon/>
                        <Text size='1' weight='medium'>Dark</Text>
                    </Flex>
                </label>
            </Grid>
        </Flex>
    </ThemeSelectorRoot>

}

const ThemeSelectorRoot = styled(Card)({
    position: 'absolute',
    top: 10,
    left: 10,
    width: 400,
    // height: 150,
})


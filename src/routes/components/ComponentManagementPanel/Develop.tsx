import { Flex, Theme, ThemePanel } from "@radix-ui/themes"
import { IntelligentSearch } from "../../../components/IntelligentSearch/IntelligentSearch"
import { useEffect, useRef } from "react"
import { createRoot } from "react-dom/client"




export const Develop = () => {
    // Refs
    const containerRef = useRef<HTMLDivElement | null>(null);
    const componentRootRef = useRef<ReturnType<typeof createRoot>>()
    
    // Effect
    useEffect(() => {
        const renderTimeout = setTimeout(() => {
            if (containerRef.current) {
                componentRootRef.current =
                componentRootRef.current ?? createRoot(containerRef.current);
            }

            if (containerRef.current && componentRootRef.current) {
                componentRootRef.current.render(
                    <Theme css={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <iframe src="https://intelligent-search.dev.thinair.cloud" style={{
                            width: 410,
                            height: 'auto',
                            border: 'none',
                        }}/>
                        {/* <IntelligentSearch/> */}
                        {/* <ThemePanel 
                            css={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: 350,
                                height: 200
                            }}
                        /> */}
                    </Theme>
                );
            }
        });
        return () => {
            clearTimeout(renderTimeout);
            const root = componentRootRef.current;
            componentRootRef.current = undefined;

            setTimeout(() => {
                root?.unmount();
            });
        };
    }, [componentRootRef]);
    return (
        <Flex 
            position={'relative'}
            ref={containerRef}
            direction={'column'} 
            width={'100%'} 
            height={'100%'} 
            gap={'3'} 
            justify={'center'}
            align={'center'}
        >
        </Flex>
    )
}



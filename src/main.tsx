import ReactDOM from 'react-dom/client'
import './global.css'
import '@radix-ui/themes/styles.css';
import { enableMapSet } from 'immer'
import { AppRouter } from './views/AppRouter';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './ui/theme';
enableMapSet()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Theme 
        appearance='dark'
        panelBackground='solid'
        accentColor="sky" 
        radius="small" 
        style={{
            height: '100vh'
        }}
    >
        {/* <ThemePanel/>  */}
        <ThemeProvider 
            // @ts-ignore
            theme={theme}
        >
            <AppRouter/>
        </ThemeProvider>
    </Theme>
)
    
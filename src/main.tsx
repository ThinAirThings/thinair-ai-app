import ReactDOM from 'react-dom/client'
import './global.css'
import '@radix-ui/themes/styles.css';
import { enableMapSet } from 'immer'
import { AppRouter } from './views/AppRouter';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from '@emotion/react';
import { theme } from './ui/theme';
enableMapSet()
// Disable right click
window.addEventListener("contextmenu", e => e.preventDefault());


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Theme 
        appearance='dark'
        panelBackground='translucent'
        accentColor="sky" 
        radius="small" 
        style={{
            height: '100vh'
        }}
    >
        <ThemeProvider theme={theme}>
            <AppRouter/>
        </ThemeProvider>
    </Theme>
)
    
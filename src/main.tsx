import ReactDOM from 'react-dom/client'
import './global.css'
import '@radix-ui/themes/styles.css';
import { enableMapSet } from 'immer'
import { AppRouter } from './views/AppRouter';
import { Theme, ThemePanel } from '@radix-ui/themes';
enableMapSet()
// Disable right click
window.addEventListener("contextmenu", e => e.preventDefault());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <Theme appearance="light" accentColor="mint" grayColor="slate" radius="small">
            <AppRouter/>
            <ThemePanel/>
        </Theme>
        
    </>


)
    

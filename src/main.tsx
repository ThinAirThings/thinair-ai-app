import ReactDOM from 'react-dom/client'
import './global.css'
import { enableMapSet } from 'immer'
import './air-systems/AirStorage.configure'
import { AppRouter } from './views/AppRouter';
enableMapSet()
// Disable right click
window.addEventListener("contextmenu", e => e.preventDefault());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppRouter/>
)
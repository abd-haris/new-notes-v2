import '../styles/output.css'

import App from './pages/app'
import { registerServiceWorker } from './utils'

document.addEventListener('DOMContentLoaded', async () => {
    const app = new App({
        content: document.getElementById('main-content'),
        buttonDrawer: document.getElementById('button-drawer'),
        navigationDrawer: document.getElementById('navigation-drawer'),
        skipLinkButton: document.getElementById('skip-link'),
        footer: document.getElementById('footer'),
    })

    await app.renderPage()
    await registerServiceWorker()

    console.log('Berhasil mendaftarkan service worker.')

    window.addEventListener('hashchange', async () => {
        await app.renderPage()
    })
})

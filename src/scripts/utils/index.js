export function setupSkipToContent(element, mainContent) {
    element.addEventListener('click', () => mainContent.focus())
}

export function transitionHelper({ skipTransition = false, updateDOM }) {
    if (skipTransition || !document.startViewTransition) {
        const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {})

        return {
            ready: Promise.reject(Error('View transition unsupported')),
            updateCallbackDone,
            finished: updateCallbackDone,
        }
    }
    return document.startViewTransition(updateDOM)
}

export function isServiceWorkerAvailable() {
    return 'serviceWorker' in navigator
}

export async function registerServiceWorker() {
    if (!isServiceWorkerAvailable()) {
        console.log('Service Worker API unsupported')
        return
    }

    try {
        const registration = await navigator.serviceWorker.register(
            '/sw.workbox.bundle.js'
        )
        console.log('Service Worker telah terpasang: ', registration)
    } catch (error) {
        console.log('gagal menginstall service worker: ', error)
    }
}

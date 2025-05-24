import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'
import { BASE_URL } from './data/api'

const manifest = self.__WB_MANIFEST
precacheAndRoute(manifest)

registerRoute(
    ({ url }) => {
        return (
            url.origin === 'https://cdnjs.cloudflare.com' ||
            url.origin.includes('fontawesome')
        )
    },
    new CacheFirst({
        cacheName: 'fontawesome',
    })
)

registerRoute(
    ({ request, url }) => {
        const baseUrl = new URL(BASE_URL)
        return baseUrl.origin === url.origin && request.destination !== 'image'
    },
    new NetworkFirst({
        cacheName: 'notes-api',
    })
)

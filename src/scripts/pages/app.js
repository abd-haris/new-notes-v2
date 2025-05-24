import {
    getActivePathname,
    getActiveRoute,
    parseActivePathname,
    parsePathname,
    getRoute,
} from '../routes/url-parser'
import {
    generateHeaderListTemplate,
    generateNavigationListTemplate,
    generateFooterLinkTemplate,
} from '../template'
import { setupSkipToContent, transitionHelper } from '../utils'
import { routes } from '../routes/routes'

export default class App {
    #content
    #buttonDrawer
    #navigationDrawer
    #skipLinkButton
    #footer
    #currentPath

    constructor({
        content,
        buttonDrawer,
        navigationDrawer,
        skipLinkButton,
        footer,
    }) {
        this.#content = content
        this.#buttonDrawer = buttonDrawer
        this.#navigationDrawer = navigationDrawer
        this.#skipLinkButton = skipLinkButton
        this.#footer = footer
        this.#currentPath = getActivePathname()

        this.#init()
    }

    #init() {
        setupSkipToContent(this.#skipLinkButton, this.#content)
        this.#setupDrawer()
    }

    #iconDrawer() {
        const iconDrawer = this.#buttonDrawer.children.namedItem('icon-drawer')
        iconDrawer.classList.toggle('fa-stream')
        iconDrawer.classList.toggle('fa-times')
    }

    #setupDrawer() {
        this.#buttonDrawer.addEventListener('click', () => {
            this.#navigationDrawer.classList.toggle('open')
            this.#iconDrawer()
        })

        document.body.addEventListener('click', (event) => {
            const isTargetInsideDrawer = this.#navigationDrawer.contains(
                event.target
            )
            const isTargetInsideButton = this.#buttonDrawer.contains(
                event.target
            )

            if (!(isTargetInsideDrawer || isTargetInsideButton)) {
                this.#navigationDrawer.classList.remove('open')
            }

            this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
                if (link.contains(event.target)) {
                    this.#navigationDrawer.classList.remove('open')
                }
            })
        })
    }

    #setupNavigationList() {
        const navList = this.#navigationDrawer.children.namedItem('navlist')
        const navListMain =
            this.#navigationDrawer.children.namedItem('navlist-main')
        const footerList = this.#footer.children.namedItem('footer-link')
        navList.innerHTML = generateHeaderListTemplate()
        navListMain.innerHTML = generateNavigationListTemplate()
        footerList.innerHTML = generateFooterLinkTemplate()
    }

    async renderPage() {
        const url = getActiveRoute()
        const route = routes[url]
        const page = route()

        if (!document.startViewTransition) {
            this.#content.innerHTML = await page.render()
            await page.afterRender()
            return
        }

        document
            .querySelectorAll('[style*="view-transition-name"]')
            .forEach((element) => {
                element.style.viewTransitionName = ''
            })

        const navigationType = this.#getNavigationType()
        let targetThumbnail = null
        let detailNote = null

        if (navigationType === 'list-to-detail' && route) {
            const parsedPathname = parseActivePathname()
            targetThumbnail = document.querySelector(
                `.note-item[data-noteid="${parsedPathname.id}"]`
            )

            if (targetThumbnail) {
                targetThumbnail.classList.add('vt-detail-note')
            }
        }

        if (navigationType === 'detail-to-list' && route) {
            const detailNote = document.querySelector('.detail-note')

            if (detailNote) {
                detailNote.classList.add('detail-note')
            }
        }

        const transition = transitionHelper({
            updateDOM: async () => {
                this.#content.innerHTML = await page.render()
                await page.afterRender()

                if (navigationType === 'detail-to-list' && route) {
                    const parsedPathname = parsePathname(this.#currentPath)
                    targetThumbnail = document.querySelector(
                        `.note-item[data-noteid="${parsedPathname.id}"]`
                    )

                    if (targetThumbnail) {
                        targetThumbnail.classList.add('vt-detail-note')
                    }
                }
            },
        })

        transition.ready.catch(console.error)

        transition.updateCallbackDone.then(() => {
            scrollTo({ top: 0, behavior: 'instant' })
            this.#setupNavigationList()
        })

        transition.finished.then(() => {
            if (targetThumbnail) {
                targetThumbnail.style.viewTransitionName = ''
            }

            if (detailNote) {
                detailNote.classList.remove('detail-note')
            }

            this.#currentPath = getActivePathname()
        })
    }

    #getNavigationType() {
        const fromRoute = getRoute(this.#currentPath)
        const toRoute = getActiveRoute()

        const notesListPath = ['/']
        const noteDetailPath = ['/notes/:id']

        if (
            notesListPath.includes(fromRoute) &&
            noteDetailPath.includes(toRoute)
        ) {
            return 'list-to-detail'
        }

        if (
            noteDetailPath.includes(fromRoute) &&
            notesListPath.includes(toRoute)
        ) {
            return 'detail-to-list'
        }

        return null
    }
}

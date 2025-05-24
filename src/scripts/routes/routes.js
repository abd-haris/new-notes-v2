import HomePage from '../pages/home/home-page'
import NewNotes from '../pages/new-notes/new-notes'
import Archive from '../pages/archive/archive'
import DetailNote from '../pages/detail/detail-note'

export const routes = {
    '/': () => new HomePage(),
    '/new': () => new NewNotes(),
    '/archive': () => new Archive(),
    '/notes/:id': () => new DetailNote(),
}

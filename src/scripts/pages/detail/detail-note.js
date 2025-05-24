import { parseActivePathname } from '../../routes/url-parser'
import * as NotesApi from '../../data/api'
import DetailNotePresenter from './detail-note-presenter'
import {
    generateDetailNoteTemplate,
    generateNoteDetailErrorTemplate,
} from '../../template'

export default class DetailNote {
    #presenter = null

    async render() {
        return `
    <section>
        <div class="report-detail__container">
          <div id="detail-note" class="w-full min-h-96 flex items-center justify-center"></div>
          <div id="detail-loading-container"></div>
        </div>
    </section>
    `
    }

    async afterRender() {
        this.#presenter = new DetailNotePresenter(parseActivePathname().id, {
            view: this,
            model: NotesApi,
        })

        this.#presenter.showDetailNote()
    }

    async populateDetailStory(message, note) {
        document.getElementById('detail-note').innerHTML =
            generateDetailNoteTemplate({
                title: note.title,
                body: note.body,
                createdAt: note.createdAt,
            })
    }

    populateDetailNoteError(message) {
        document.getElementById('detail-note').innerHTML =
            generateNoteDetailErrorTemplate(message)
    }
}

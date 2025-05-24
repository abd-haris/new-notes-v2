import {
    generateNotesListEmptyTemplate,
    generateNotesListErrorTemplate,
    generateNoteItemTemplate,
} from '../../template'

import HomePresenter from './home-presenter'
import * as NotesAPI from '../../data/api'

export default class HomePage {
    #presenter = null

    async render() {
        return `
    <section>
        <h1 class="text-center text-2xl font-bold text-orange-500">Daftar Catatan</h1>
        <div class="my-10">
            <div id="notes-list"></div>
        </div>
    </section>
    `
    }

    async afterRender() {
        this.#presenter = new HomePresenter({
            view: this,
            model: NotesAPI,
        })

        await this.#presenter.initialNotes()
    }

    populateNoteList(message, notes) {
        if (notes.length <= 0) {
            this.populateNoteListEmpty()
            return
        }

        const html = notes.map((note) => {
            console.log('archived: ', note.archived)
            return generateNoteItemTemplate({ ...note })
        })

        document.getElementById('notes-list').innerHTML = `
      <div class="grid gap-y-10 md:grid-cols-2 md:gap-x-10 md:mx-5 lg:grid-cols-3">${html.join('')}</div>
      `

        if (notes.length > 0) {
            notes.map((note) => {
                document
                    .querySelector(`#archive-${note.id}`)
                    .addEventListener('click', async () => {
                        alert(`anda mengarsipkan note dengan id: ${note.id}`)
                        await this.#presenter.noteArchive(note.id)
                        await this.#presenter.initialNotes()
                    })
            })
        }
    }

    populateNoteListEmpty() {
        document.getElementById('notes-list').innerHTML =
            generateNotesListEmptyTemplate()
    }

    populateNotesListError(message) {
        document.getElementById('notes-list').innerHTML =
            generateNotesListErrorTemplate(message)
    }
}

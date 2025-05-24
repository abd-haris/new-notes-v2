import ArchivePresenter from './archive-presenter'
import * as NotesApi from '../../data/api'
import {
    generateNotesListEmptyTemplate,
    generateNotesListErrorTemplate,
    generateNoteArchiveTemplate,
} from '../../template'

export default class Archive {
    #presenter
    async render() {
        return `
    <section>
        <h1 class="text-center text-2xl font-bold text-orange-500">Archive Catatan</h1>
        <div class="my-10">
            <div id="notes-list"></div>
        </div>
    </section>
    `
    }

    async afterRender() {
        this.#presenter = new ArchivePresenter({
            view: this,
            model: NotesApi,
        })

        await this.#presenter.initialArchiveNotes()
    }

    populateArchiveList(message, notes) {
        if (notes <= 0) {
            this.populateArchiveListEmpty()
            return
        }

        const html = notes.map((note) => {
            return generateNoteArchiveTemplate({ ...note })
        })

        document.getElementById('notes-list').innerHTML = `
    <div class="grid gap-y-10 md:grid-cols-2 md:gap-x-10 md:mx-5 lg:grid-cols-3">${html.join('')}</div>
    `

        if (notes.length > 0) {
            notes.map((note) => {
                document
                    .querySelector(`#unarchive-${note.id}`)
                    .addEventListener('click', async () => {
                        alert(
                            `anda tidak jadi mengarsipkan note dengan id: ${note.id}`
                        )
                        await this.#presenter.noteUnarchive(note.id)
                        await this.#presenter.initialArchiveNotes()
                    })

                document
                    .querySelector(`#delete-archive-${note.id}`)
                    .addEventListener('click', async () => {
                        alert(
                            `anda menghapus note di archive dengan id: ${note.id}`
                        )
                        await this.#presenter.noteDelete(note.id)
                        await this.#presenter.initialArchiveNotes()
                    })
            })
        }
    }

    populateArchiveListEmpty() {
        document.getElementById('notes-list').innerHTML =
            generateNotesListEmptyTemplate()
    }

    populateArchiveListError(message) {
        document.getElementById('notes-list').innerHTML =
            generateNotesListErrorTemplate(message)
    }
}

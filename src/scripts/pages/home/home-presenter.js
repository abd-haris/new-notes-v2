export default class HomePresenter {
    #view
    #model

    constructor({ view, model }) {
        this.#view = view
        this.#model = model
    }

    async initialNotes() {
        try {
            const response = await this.#model.getAllNotes()

            if (!response.ok) {
                console.log('initialNotes : response:', response)
                this.#view.populateNotesListError(response)
                return
            }

            await this.#view.populateNoteList(response.message, response.data)
        } catch (error) {
            console.error('initialNotes: error', error)
            this.#view.populateNotesListError(error)
        }
    }

    async noteArchive(noteId) {
        try {
            await this.#model.archiveNote(noteId)
        } catch (error) {
            console.error('archiveNote: error: ', error)
        }
    }
}

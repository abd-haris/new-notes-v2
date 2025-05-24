export default class ArchivePresenter {
    #view
    #model

    constructor({ view, model }) {
        this.#view = view
        this.#model = model
    }

    async initialArchiveNotes() {
        try {
            const response = await this.#model.getArchiveNotes()
            console.log('response: ', response)

            if (!response.ok) {
                console.log('InitialArchiveNotes: response: ', response)
                this.#view.populateArchiveListError(response)
            }

            this.#view.populateArchiveList(response.message, response.data)
        } catch (error) {
            console.error('initialArchiveNotes: error: ', error)
            this.#view.populateArchiveListError(error)
        }
    }

    async noteUnarchive(noteId) {
        try {
            await this.#model.unarchiveNote(noteId)
        } catch (error) {
            console.error('unarchiveNote: error: ', error)
        }
    }

    async noteDelete(noteId) {
        try {
            await this.#model.deleteNote(noteId)
        } catch (error) {
            console.error('deleteNote: error: ', error)
        }
    }
}

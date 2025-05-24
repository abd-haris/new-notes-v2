export default class DetailNotePresenter {
    #noteId
    #view
    #model

    constructor(noteId, { view, model }) {
        this.#noteId = noteId
        this.#view = view
        this.#model = model
    }

    async showDetailNote() {
        try {
            const response = await this.#model.getDetailNote(this.#noteId)

            if (!response.ok) {
                console.log('showNoteDetail: response: ', response)
                this.#view.populateDetailNoteError(response)
            }

            this.#view.populateDetailStory(response.message, response.data)
        } catch (error) {
            console.error('showNoteDetail: error: ', error)
            this.#view.populateDetailNoteError(error)
        }
    }
}

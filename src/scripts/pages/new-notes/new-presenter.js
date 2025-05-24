export default class NewPresenter {
    #view
    #model

    constructor({ view, model }) {
        this.#view = view
        this.#model = model
    }

    async postNewNotes({ title, body }) {
        try {
            const data = {
                title: title,
                body: body,
            }

            const response = await this.#model.storeNewNotes(data)

            if (!response.ok) {
                console.log('postNewStory: response : ', response)
                this.#view.storeFailed(response.message)
                return
            }

            this.#view.storeSuccessfully(response.message, response.data)
        } catch (error) {
            console.error('postNewNotes : error: ', error)
            this.#view.storeFailed(error.message)
        }
    }
}

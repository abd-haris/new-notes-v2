import NewPresenter from './new-presenter'
import * as NotesApi from '../../data/api'

export default class NewNotes {
    #presenter
    #form

    async render() {
        return `
    <section>
      <h1 class="text-center text-2xl font-bold text-orange-500">Buat Catatan</h1>
      <div class="w-full md:flex md:justify-center">
        <form id="form-input" class="flex flex-col gap-y-4 border border-orange-500 w-full p-5 rounded-2xl mt-5 md:w-2/3 md:mt-10 lg:w-1/2">
          <div class="flex flex-col gap-y-2">
            <label for="input-title">Judul</label>
            <input type="text" id="input-title" name="input-title" placeholder="aaaaa...." class="border border-gray-300 p-2 rounded-xl">
          </div>
          <div class="flex flex-col gap-y-2">
            <label for="input-description">Deskripsi</label>
            <textarea id="input-description" name="input-description" placeholder="aaaaa...." class="border border-gray-300 p-2 rounded-xl"></textarea>
          </div>
          <div class="relative group">
            <button
            class="relative inline-block p-px font-semibold leading-6 text-yellow-50 bg-yellow-50 shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95" type="submit">
              <span
              class="absolute inset-0 rounded-xl bg-orange-900 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span class="relative z-10 block px-4 py-2 rounded-xl bg-orange-500">
                <div class="relative z-10 flex items-center space-x-2">
                  <span class="transition-all duration-500 group-hover:translate-x-1">
                  Buat Catatan
                  </span>
                  <i class="fas fa-plus-circle"></i>
                </div>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
    `
    }

    async afterRender() {
        this.#presenter = new NewPresenter({
            view: this,
            model: NotesApi,
        })

        this.#setupForm()
    }

    #setupForm() {
        this.#form = document.getElementById('form-input')
        this.#form.addEventListener('submit', async (event) => {
            event.preventDefault()

            const data = {
                title: this.#form.elements.namedItem('input-title').value,
                body: this.#form.elements.namedItem('input-description').value,
            }

            await this.#presenter.postNewNotes(data)
        })
    }

    storeSuccessfully(message) {
        alert(message)
        this.clearForm()
        location.hash = '/'
    }

    storeFailed(message) {
        alert(message)
    }

    clearForm() {
        this.#form.reset()
    }
}

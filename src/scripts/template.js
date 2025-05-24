export function generateNavigationListTemplate() {
    return `
    <li><a id="notes-list-button" class="text-orange-500 flex items-center gap-x-2" href="#/"><i class="fas fa-list-alt"></i> <span>Daftar Catatan</span></a></li>
    <li><a id="archive-button" class="text-orange-500 flex items-center gap-x-2" href="#/archive"><i class="fas fa-archive"></i><span>Arsip Catatan</span></a></li>
    `
}

export function generateHeaderListTemplate() {
    return `
  <li>
    <div class="flex gap-x-2 items-center">
      <input placeholder="cari..." class="focus:border-2 border-gray-700 px-5 py-2 rounded-xl w-full transition-all outline-none bg-yellow-50 order-2 md:order-1" name="search" type="search" id="search">
      <label id="search" class="text-orange-500 order-1 md:order-2"><i class="fas fa-search"></i></label>
    </div>
  </li>
  <li><a id="add-note" class="text-orange-500 flex items-center gap-x-2" href="#/new"><i class="fas fa-plus-circle"></i><span class="md:hidden lg:inline">Tambah Catatan</span></a></li>
  `
}

export function generateFooterLinkTemplate() {
    return `
  <li><a href="https://github.com/abd-haris"><img class="size-6" src="images/link-image/github-48.png" alt="Github Image"></a></li>
  <li><a href="https://www.linkedin.com/in/abdul-haris-3925b1222/"><img class="size-6" src="images/link-image/linkedin-48.png" alt="linkedin image"></a></li>
  <li><a href="https://www.instagram.com/abdul_haris189/"><img class="size-6" src="images/link-image/instagram-48.png" alt="instagram image"></a></li>
  <li><a href="https://web.facebook.com/haris.abdul.9889261"><img class="size-6" src="images/link-image/facebook-48.png" alt="facebook image"></a></li>
  `
}

export function generateNotesListEmptyTemplate() {
    return `
  <div id="notes-list-empty" class="">
      <h2>Tidak ada Catatan yang tersedia</h2>
      <p>Saat ini, tidak ada catatan yang dapat ditampilkan.</p>
    </div>
  `
}

export function generateNotesListErrorTemplate(message) {
    return `
  <div id="notes-list-error" class="">
      <h2>Terjadi kesalahan pengambilan daftar catatan</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `
}

export function generateNoteDetailErrorTemplate(message) {
    return `
  <div id="story-detail-error" class="story-detail__error">
    <h2>Terjadi kesalahan pengambilan detail note</h2>
    <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
  </div>
`
}

export function generateNoteItemTemplate({ id, title, body }) {
    return `
  <div class="note-item" data-noteid="${id}">
    <div class="border border-orange-500 bg-yellow-50 w-full shadow-xl rounded-2xl p-8 flex flex-col gap-y-4">
      <div class="max-w-full line-clamp-2">
        <h2 class="text-2xl font-bold pb-2 text-orange-500">${title}</h2>
        <p class="text-lg text-orange-500">${body}</p>
      </div>
      <div class="flex gap-x-4">
        <div class="relative group">
          <button
          class="relative inline-block p-px font-semibold leading-6 text-orange-500 bg-orange-500 shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95" id="archive-${id}">
            <span class="absolute inset-0 rounded-xl bg-orange-900 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span class="relative z-10 block px-4 py-2 rounded-xl bg-yellow-100">
              <div class="relative z-10 flex items-center space-x-2">
                <span class="transition-all duration-500 group-hover:translate-x-1">
                Archive
                </span>
                <i class="fas fa-archive"></i>
              </div>
            </span>
          </button>
        </div>

        <div class="relative group">
          <a
          class="relative inline-block p-px font-semibold leading-6 text-yellow-50 bg-yellow-50 shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 delete-btn" href="#/notes/${id}">
            <span
            class="absolute inset-0 rounded-xl bg-orange-900 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span class="relative z-10 block px-4 py-2 rounded-xl bg-orange-500">
              <div class="relative z-10 flex items-center space-x-2">
                <span class="transition-all duration-500 group-hover:translate-x-1">
                Detail
                </span>
                <i class="fas fa-info-circle"></i>
              </div>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
  `
}

export function generateNoteArchiveTemplate({ id, title, body }) {
    return `
  <div data-noteid="${id}">
    <div class="border border-orange-500 bg-yellow-50 w-full shadow-xl rounded-2xl p-8 flex flex-col gap-y-4">
      <div class="max-w-full line-clamp-2">
        <h2 class="text-2xl font-bold pb-2 text-orange-500">${title}</h2>
        <p class="text-lg text-orange-500">${body}</p>
      </div>
      <div class="flex gap-x-4">
        <div class="relative group">
          <button
          class="relative inline-block p-px font-semibold leading-6 text-orange-500 bg-orange-500 shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95" id="unarchive-${id}">
            <span class="absolute inset-0 rounded-xl bg-orange-900 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span class="relative z-10 block px-4 py-2 rounded-xl bg-yellow-100">
              <div class="relative z-10 flex items-center space-x-2">
                <span class="transition-all duration-500 group-hover:translate-x-1">
                Unarchive
                </span>
                <i class="fas fa-undo"></i>
              </div>
            </span>
          </button>
        </div>

        <div class="relative group">
          <button
          class="relative inline-block p-px font-semibold leading-6 text-yellow-50 bg-yellow-50 shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 delete-btn" id="delete-archive-${id}">
            <span
            class="absolute inset-0 rounded-xl bg-orange-900 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span class="relative z-10 block px-4 py-2 rounded-xl bg-orange-500">
              <div class="relative z-10 flex items-center space-x-2">
                <span class="transition-all duration-500 group-hover:translate-x-1">
                Delete
                </span>
                <i class="fas fa-trash"></i>
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  `
}

export function generateDetailNoteTemplate({ title, body, createdAt }) {
    return `
  <div class="border border-orange-500 bg-yellow-50 w-2/3 shadow-xl rounded-2xl p-8 flex flex-col gap-y-4">
    <p class="text-sm text-gray-400">Created At: ${createdAt}</p>
    <div class="max-w-full line-clamp-2 flex flex-col gap-y-2">
      <div class="flex flex-col">
        <span class="text-xl font-bold text-orange-500">Judul</span>
        <h2 class="text-2xl text-orange-500">${title}</h2>
      </div>
      <div class="flex flex-col gap-y-1">
        <span class="text-lg font-bold text-orange-500">Deskripsi</span>
        <p class="text-lg text-orange-500">${body}</p>
      </div>
    </div>
    <div class="flex gap-x-4">
    </div>
  </div>
  `
}

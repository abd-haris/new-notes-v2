export const BASE_URL = 'https://notes-api.dicoding.dev/v2'

const ENDPOINTS = {
    NOTES_LIST: `${BASE_URL}/notes`,
    ARCHIVE_NOTE: `${BASE_URL}/notes/archived`,
    DETAIL_NOTE: (id) => `${BASE_URL}/notes/${id}`,
}

export async function getAllNotes() {
    const fetchResponse = await fetch(ENDPOINTS.NOTES_LIST)
    const json = await fetchResponse.json()
    return {
        ...json,
        ok: fetchResponse.ok,
    }
}

export async function getDetailNote(id) {
    const fetchResponse = await fetch(ENDPOINTS.DETAIL_NOTE(id))
    const json = await fetchResponse.json()
    return {
        ...json,
        ok: fetchResponse.ok,
    }
}

export async function getArchiveNotes() {
    const fetchResponse = await fetch(ENDPOINTS.ARCHIVE_NOTE)
    const json = await fetchResponse.json()
    return {
        ...json,
        ok: fetchResponse.ok,
    }
}

export async function storeNewNotes({ title, body }) {
    const data = {
        title: title,
        body: body,
    }
    const fetchResponse = await fetch(ENDPOINTS.NOTES_LIST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    const json = await fetchResponse.json()

    return {
        ...json,
        ok: fetchResponse.ok,
    }
}

export async function archiveNote(noteId) {
    const fetchResponse = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    const json = fetchResponse.json()
    return await json
}

export async function unarchiveNote(noteId) {
    const fetchResponse = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    const json = fetchResponse.json()
    return await json
}

export async function deleteNote(noteId) {
    const fetchResponse = await fetch(`${ENDPOINTS.NOTES_LIST}/${noteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    const json = fetchResponse.json()
    return await json
}

const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
const ADD_ENTRY = 'ADD_ENTRY'

const receiveEntries = (entries) => ({
    type: RECEIVE_ENTRIES,
    entries
})

const addEntry = (entry) => ({
    type: ADD_ENTRY,
    entry
})

export {
    RECEIVE_ENTRIES,
    ADD_ENTRY,

    receiveEntries,
    addEntry,
}
import { AsyncStorage } from 'react-native'
import { 
    CALENDAR_STORAGE_KEY, 
    formatCalendarResults 
} from './_calendar'

const fetchCalendarResults = () => {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then( formatCalendarResults )
}

const submitEntry = (key, entry) => {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

const removeEntry = (key) => {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((items) => {
            const data = JSON.parse(items)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}

export {
    submitEntry,
    removeEntry,
    fetchCalendarResults,
}
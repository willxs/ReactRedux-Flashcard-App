import { AsyncStorage } from "react-native"
import Deck from "./../data/Deck"
import { MockDecks } from "./../data/MockData"

export const DECK_KEY = "flashcards:decks"
// generic read
async function write(key, item) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
        console.error(error.message)
    }
}

// generic write
async function read(key, deserializer) {
    try {
        const values = await AsyncStorage.getItem(key)
        if (values !== null) {
            let readValues = JSON.parse(values).map(serialized => {
                return deserializer(serialized)
            })
            return readValues
        } else {
            console.info(`Could not find ${key} on disk.`)
        }
    } catch (error) {
        console.error(error.message)
    }
}

export const readDecks = () => {
    //console.log('reading data')
    return read(DECK_KEY, Deck.fromObject)
}

export const writeDecks = (decks) => {
    //console.log('writing data')
    return write(DECK_KEY, decks)
}

export const tempClear = async() => {
    console.log('clearing')
    AsyncStorage.clear();
}

// for debugging
tempClear()
//const mockData = writeDecks(MockDecks);
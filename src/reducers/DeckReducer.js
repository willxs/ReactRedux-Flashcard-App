import { ADD_DECK, ADD_CARD, DELETE_CARD, LOAD_DATA, UPDATE_DECK, REPLACE_CARD, EDIT_CARD, DELETE_DECK } from '../actions/types'

import Card from './../utilities/data/Card'
import Deck from '../utilities/data/Deck'
import { writeDecks } from './../utilities/storage/decks'
import { updateDeckWithDeckAction } from "../actions/creators"

const axios = require('axios').default;
var baseAPIUrlSyncedDeck = 'https://flashcard-comp3004.firebaseio.com/SyncedDeck/'
var apiEnd = ".json";
import md5 from "md5"

// used for modifying cards (note: ID's have to be identical)
function deckArrayWithReplacedCard(decks, replacerCard) {
    return decks.map(deck => {
        if (deck.id === replacerCard.deckID) {
            deck.cards = deck.cards.map(card => {
                if (card.cardID === replacerCard.cardID) {
                    return replacerCard
                }
                return card
            })
        }
        return deck
    })
}

// used for removing cards (note: ID's have to be identical)
function deckArrayWithRemovedCard(decks, markedCard) {
    let newDecks = decks.slice(0, decks.length) 
    let markedDeck = null
    for (let i = 0; i < newDecks.length; i++){
        if (newDecks[i].id === markedCard.deckID){
            markedDeck = newDecks.splice(i, 1)[0]
            break
        }
    }

    if (markedDeck) {
        for (let i = 0; i < markedDeck.cards.length; i++) {
            if (markedDeck.cards[i].cardID === markedCard.cardID) {
                markedDeck.cards.splice(i, 1)
                break
            }
        }
        return newDecks.concat(markedDeck)
    }

    return decks
    /*
    return newDecks.map(deck => {
        //console.log(deck.id, markedCard.deckID)
        if (deck.id !== markedCard.deckID) {
            console.log("Old deck:", deck)
            let newCards = deck.cards.slice()
            newCards = newCards.map(card => {
                if (card.cardID !== markedCard.cardID) {
                    return card
                }
            })
            deck.cards = newCards
            console.log("New deck:", deck)
            return deck
        }
        
        //return 
    })
    console.log(newDecks)
    return newDecks*/
}

const reducer = (state = [], action) => {
    let updatedState = state
    switch (action.type) {
        case LOAD_DATA:
            updatedState = action.payload // decks loaded from disk
            return updatedState
        case ADD_DECK:
            updatedState = state.concat(action.payload)
            saveDecks(updatedState)
            return updatedState
        case ADD_CARD:
            updatedState = deckArrayWithNewCard(state, action.payload)
            saveDecks(updatedState)
            return updatedState
        case DELETE_CARD:
            updatedState = deckArrayWithRemovedCard(state, action.payload)
            saveDecks(updatedState)
            return updatedState
        case REPLACE_CARD:
            updatedState = deckArrayWithReplacedCard(state, action.payload)
            saveDecks(updatedState)
            return updatedState
        case UPDATE_DECK:
            updatedState = updatedDeckWithDeck(state, action.payload)
            saveDecks(updatedState)
            return updatedState
        case EDIT_CARD:
            updatedState = editCard(state, action.payload)
            saveDecks(updatedState)
            return updatedState
         case DELETE_DECK:
            updatedState = deleteDeckLocal(state, action.payload)
            saveDecks(updatedState)
            return updatedState
    }
    return updatedState
}

function deleteDeckLocal(decks, deckToDelete){
    //force state change, cause redux only does shallow comparison 
    let resultDeck = decks.slice(0, decks.length) 
    
    let found = false;
    for (let i = 0; i < decks.length; i++){
        if (decks[i].id === deckToDelete.id){
            resultDeck.splice(i, 1)
            found = true
            break
        }
    }
    return resultDeck
}

function deckArrayWithNewCard(decks, card) {
    return decks.map(deck => {
        if (deck.id === card.deckID) {
            deck.addCard(card)
            deck.updateModification()
        }
        return deck
    })
}

function saveDecks(state) {
    writeDecks(state)
    return state
}

function updatedDeckWithDeck(decks, deckToAdd){
    let resultDeck = decks.slice(0, decks.length) 
    let found = false
    for (let i = 0; i < resultDeck.length; i++){
        //if local contains deck, replaced with new deck
        if (resultDeck[i].id === deckToAdd.id){
            resultDeck[i] = deckToAdd
            found = true
            break
        }
    }

    if (found === false){
        //console.log(deckToAdd)
        resultDeck = resultDeck.concat(deckToAdd)
        //console.log(resultDeck)
    }

    return resultDeck
}

async function getDeck(deckId) {
    try {
        const res = await axios.get(baseAPIUrlSyncedDeck + deckId + apiEnd)
        return res.data
    } catch (error) {
        console.log("ERROR DETECTED")
        console.error(error)
    }
}

async function putDeck(deck){
    let deckId = deck.id
    try {
        const res = await axios.put(baseAPIUrlSyncedDeck + deckId + apiEnd, deck);
    } catch (err){
        console.error(err)
    }
}

async function checkDeckExists(deckId){
    let response = await getDeck(deckId)
    if (response === null){
        return false
    } else {
        return true
    }
}

function cleanUpDeckForUpload(deck){
    deck.lastReviewed = 0
    for (let i = 0; i < deck.length; i++){
        deck[i].EF = 2.5     //GOBACK TO SET DEFAULT VALUE
        deck[i].n = 1 // default the interval as well
    }

    return deck
}

async function deleteDeck(deckId){
    try {
        await axios.delete(baseAPIUrlSyncedDeck + deckId + apiEnd)
    } catch (error) {
        console.error(error)
    }
}

function editCard(decks, payload){
    console.log("In EDITCARD");
    return decks.map((deck) => {
        if(deck.id === payload.deckID){
            deck.cards.map((card) => {
                if(card.cardID === payload.cardID){
                    card.front = payload.newCard.front;
                    card.back = payload.newCard.back;
                }
                return card;
            })
        }
        return deck;
    })
}

export function uploadFireBase(deck){
    return async function uploadToFireBase(dispatch, getState){
        let uploadingDeck = cleanUpDeckForUpload(deck)


        //check if deck exists on server
        if (await checkDeckExists(uploadingDeck.id)){
            deleteDeck(uploadingDeck.id)
            putDeck(uploadingDeck)
        }
        //deck doesn't exists on server, so add the new deck to server
        else {
            putDeck(uploadingDeck)
        }
        uploadingDeck.synced = true
        dispatch(updateDeckWithDeckAction(uploadingDeck))
    }

}

function newDeckFromResponse(responseData){
    let responseDataNewDeck = new Deck(responseData.title, responseData.subtitle)
    responseDataNewDeck.creationDate = responseData.creationDate
    responseDataNewDeck.id = md5(responseData.title + Date.now())
    responseDataNewDeck.lastModified = responseData.lastModified
    responseDataNewDeck.lastReviewed = responseData.lastReviewed
    responseDataNewDeck.cards = []

    for (let i = 0; i < responseData.cards.length; i++){
        let newCard = new Card(responseData.cards[i].front, responseData.cards[i].back, responseDataNewDeck.id)
        newCard.lastModified = responseData.cards[i].lastModified  
        responseDataNewDeck.cards.push(newCard)

    }

    return responseDataNewDeck
}

export function downloadFireBase(deckIdString){
    return async function downloadToFireBase(dispatch, getState){

        let responseData = await getDeck(deckIdString)
        if (responseData !== null){
            let newDownloadedDeck = newDeckFromResponse(responseData)
            dispatch(updateDeckWithDeckAction(newDownloadedDeck))
        } else {
            console.warn("deckId not found on Firebase")
        }

    }
}

export default reducer

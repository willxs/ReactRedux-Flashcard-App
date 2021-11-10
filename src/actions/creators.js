import {
    ADD_DECK,
    ADD_CARD,
    REPLACE_CARD,
    DELETE_CARD,
    SEARCH,
    LOAD_DATA,
    CREATE_STUDY,
    NEXT_CARD,
    END_STUDY,
    UPDATE_DECK,
    EDIT_CARD,
    DELETE_DECK
} from './types'

import Card from './../utilities/data/Card'
import Deck from './../utilities/data/Deck'

export const addDeckAction = (title, subtitle) => {
    return { type : ADD_DECK, payload: new Deck(title, subtitle) }
}

export const addCardAction = (front, back, deckID) => {
    return { type : ADD_CARD, payload: new Card(front, back, deckID) }
}

export const deleteCardInDeckAction = (cardID, deckID) => {
    return { type : DELETE_CARD, payload: {cardID : cardID, deckID : deckID} }
}

export const replaceCardInDeckAction = (card) => {
    return { type : REPLACE_CARD, payload: card}
}

export const searchAction = (term) => {
    return { type : SEARCH, payload: term }
}

export const loadDataAction = (data) => {
    return { type : LOAD_DATA, payload: data }
}

export const createStudyAction = (deckID) => {
    return { type : CREATE_STUDY, payload: deckID }
}

export const nextCardAction = (response) => {
    return { type: NEXT_CARD, payload: response };
}

export const endStudyAction = () => {
    return { type: END_STUDY, payload: {} };
}

export const updateDeckWithDeckAction = (deck) => {
    return { type: UPDATE_DECK, payload: deck };
}

export const deleteDeckAction = (deck) => {
    return { type: DELETE_DECK, payload: deck };
}

export const editCardAction = (oldCard, newCard, deckID, cardID) => {
    return { type : EDIT_CARD, payload: {oldCard: oldCard, newCard: newCard, deckID: deckID, cardID: cardID} }
}

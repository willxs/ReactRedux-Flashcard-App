/* This reducer generates a quiz/study based on a deck given, it achieves this through https://www.supermemo.com/en/archives1990-2015/english/ol/sm2 */
// currently implemented as using the whole deck.

import { CREATE_STUDY, NEXT_CARD, END_STUDY } from "./../actions/types"
import Queue from "./../utilities/ds/Queue"

export const setStudyState = (
        deckID = null, 
        studyQueue = null,
        lastStudied = null,
    ) => {
    return { deckID, studyQueue, lastStudied }
}

function generateStudy(deck) {
    console.log("generaternio")
    let interval = deck.getInterval()
    let studyQueue = new Queue()

    // filter deck with only cards that are elegable for a study.
    let studyCards = deck.cards.filter(card => {
        return ((card.EF < 4) && (card.getInterval() <= interval))
      })
    
    // put the study cards into the queue for easier operations
    studyCards.map((studyCard) => {
        return studyQueue.enqueue(studyCard)
    })
    return setStudyState(deck.id, studyQueue, null)
}

//interval(cardsabove(getdeck
function getDeck(decks, deckID) {
    return decks.find(deck => {
        return (deck.id === deckID)
    })
}

function endStudy(state) {
    return setStudyState(
        state.deckID,
        null,
        null,
    )
}

// user gave a response to the flashcard.
function nextCard(state, response) {
    if (state.studyQueue.isEmpty()) return endStudy(state)
    console.log("old EF:", state.studyQueue.peek().EF)
    let lastStudied = state.studyQueue.dequeue()
    lastStudied.updateEF(response)
    console.log("new EF:", lastStudied.EF)
    // put failed cards back in the study queue
    if (lastStudied.n === 1) state.studyQueue.enqueue(lastStudied)
    return setStudyState(
        state.deckID,
        state.studyQueue,
        lastStudied,
    )
}

const reducer = (state = setStudyState(), action, decks) => {
    let updatedState = state // made explicit to show state management
    switch (action.type) {
        case CREATE_STUDY:
            updatedState = generateStudy(getDeck(decks, action.payload))
            return updatedState
        case NEXT_CARD:
            updatedState = nextCard(state, action.payload) 
            //saveDecks(decks)
            return updatedState
        case END_STUDY:
            return updatedState
    }
    return updatedState
}

export default reducer
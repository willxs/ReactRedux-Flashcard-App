/* PUT ALL YOUR INITIAL STATE VALUES HERE */

import deckReducer from "./DeckReducer"
import searchReducer from "./SearchReducer"
import studyReducer, { setStudyState } from "./StudyReducer"
// enable currentStudy after cards are implemented.
const INITIAL_STATE = {
    decks: [],
    search_term: "",
    currentStudy: setStudyState(),
}

export const reducer = (state = INITIAL_STATE, action) => {
    let decks = deckReducer(state.decks, action)
    let search_term = searchReducer(state.search_term, action)
    let currentStudy = studyReducer(state.currentStudy, action, state.decks)
    return {
        decks: decks,
        search_term: search_term,
        currentStudy: currentStudy,
    }
}
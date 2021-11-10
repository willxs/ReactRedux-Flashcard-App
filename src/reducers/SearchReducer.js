import { SEARCH } from '../actions/types'

const reducer = (state = "", action) => {
    switch (action.type) {
        case SEARCH:
            return action.payload
    }
    return state
}

export default reducer
import {} from '../constants'
import {normalizedComments} from '../fixtures'
import {ADD_COMMENT} from '../constants';

const defaultComments = normalizedComments.reduce((acc, comment) => ({
    ...acc,
    [comment.id]: comment
}), {})

export default (state = defaultComments, action) => {
    const {type, payload, response, error} = action

    switch (type) {
        case ADD_COMMENT:
            let {user, text, aID, cID} = action.payload;
            let comment = {[cID]: {id: cID, user, text}};
            return Object.assign({}, state, comment);
    }

    return state
}
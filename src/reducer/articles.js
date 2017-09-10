import {ADD_COMMENT, DELETE_ARTICLE} from '../constants'
import { normalizedArticles } from '../fixtures'

let defaultArticles = normalizedArticles.reduce((cache, item) => (cache[item.id] = item, cache), {});

export default (articles = defaultArticles, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            var state = {};
            delete Object.assign(state, articles)[payload.id];
            return state;

        case ADD_COMMENT:
            let {aID, cID} = payload;

            var state = Object.assign({}, articles);
            for (let k in articles) {
                Object.assign((state[k] = {}), articles[k])
            }
            state[aID].comments.push(cID);
            return state;
    }

    return articles
}
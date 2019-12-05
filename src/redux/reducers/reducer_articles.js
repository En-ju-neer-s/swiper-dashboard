import { FETCH_ARTICLES } from '../actions/articles';

export default function (state = [], action) {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_ARTICLES:
            return action.payload.data;
    }

    return state;
}
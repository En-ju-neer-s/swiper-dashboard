import { FETCH_SWIPES } from '../actions/swipes';

export default function (state = [], action) {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_SWIPES:
            return action.payload.data;
    }

    return state;
}
import { take } from 'lodash';

import { FETCH_SWIPES } from '../actions/swipes';

export default function (state = [], action) {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_SWIPES:
            return take(action.payload.data, 7)
        // return action.payload.data;
    }

    return state;
}
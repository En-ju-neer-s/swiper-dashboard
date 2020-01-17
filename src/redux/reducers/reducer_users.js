import { take } from 'lodash';

import { FETCH_USERS } from '../actions/users';

export default function (state = [], action) {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_USERS:
            // return action.payload.data;
            return take(action.payload.data, 7);
    }

    return state;
}
import { FETCH_STATS } from '../actions/stats';

export default function (state = null, action) {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_STATS:
            return action.payload.data;
    }

    return state;
}
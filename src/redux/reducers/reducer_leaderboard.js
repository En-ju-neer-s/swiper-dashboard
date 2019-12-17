import { FETCH_LEADERBOARD } from '../actions/leaderboard';

export default function (state = null, action) {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_LEADERBOARD:
            return action.payload.data;
    }

    return state;
}
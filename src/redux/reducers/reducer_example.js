import { FETCH_EXAMPLE } from '../actions/example';

export default function (state = [], action) {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_EXAMPLE:
            return [action.payload.data, ...state];
    }

    return state;
}
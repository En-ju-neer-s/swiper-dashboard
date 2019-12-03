import axios from 'axios';
import { SWIPER_API } from '../constants';

export const FETCH_USERS = 'FETCH_USERS';

const URL = `${SWIPER_API}/dashboard/graphUsers`;

export function fetchUsers() {
    const url = URL;
    const request = axios.get(url);

    return {
        type: FETCH_USERS,
        payload: request
    };
}
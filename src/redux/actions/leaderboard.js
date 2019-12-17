import axios from 'axios';
import { SWIPER_API } from '../constants';

export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';

const URL = `${SWIPER_API}/users`;

export function fetchLeaderboard() {
    const url = URL;
    const request = axios.get(url);

    return {
        type: FETCH_LEADERBOARD,
        payload: request
    };
}
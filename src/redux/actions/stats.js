import axios from 'axios';
import { SWIPER_API } from '../constants';

export const FETCH_STATS = 'FETCH_STATS';

const URL = `${SWIPER_API}/dashboard/stats`;

export function fetchStats() {
    const url = URL;
    const request = axios.get(url);

    return {
        type: FETCH_STATS,
        payload: request
    };
}
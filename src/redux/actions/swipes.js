import axios from 'axios';
import { SWIPER_API } from '../constants';

export const FETCH_SWIPES = 'FETCH_SWIPES';

const URL = `${SWIPER_API}/dashboard/graphSwipes`;

export function fetchSwipes() {
    const url = URL;
    const request = axios.get(url);

    return {
        type: FETCH_SWIPES,
        payload: request
    };
}
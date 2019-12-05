import axios from 'axios';
import { SWIPER_API } from '../constants';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';

const URL = `${SWIPER_API}/dashboard/swipesStats`;

export function fetchArticles() {
    const url = URL;
    const request = axios.get(url);

    return {
        type: FETCH_ARTICLES,
        payload: request
    };
}
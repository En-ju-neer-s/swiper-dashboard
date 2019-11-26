import axios from 'axios';

export const FETCH_EXAMPLE = 'FETCH_EXAMPLE';

const URL = `<APIURL>`;

export function fetchExample(city) {
    const url = URL;
    const request = axios.get(url);

    return {
        type: FETCH_EXAMPLE,
        payload: request
    };
}
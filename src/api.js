import axios from 'axios';

const apiKey = '39305743-6b78f5777c3200efc39eb3696';
const baseUrl = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page, perPage) {
    const params = {
        key: apiKey,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
    };

    try {
        const response = await axios.get(baseUrl, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
}

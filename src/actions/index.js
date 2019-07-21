import axios from 'axios';

const NUTRIONAX_API_BASE_URL =
  'https://trackapi.nutritionix.com/v2/natural/nutrients';

const NUTRIONAX_API_HEADERS = {
  'Content-Type': 'application/json',
  'x-app-id': 'f73b82d4',
  'x-app-key': '985bf748bfe14d5ab61fa3703771cfff'
};

export const client = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getNutrionalValue = ingredients =>
  axios.post(NUTRIONAX_API_BASE_URL, ingredients, {
    headers: NUTRIONAX_API_HEADERS
  });

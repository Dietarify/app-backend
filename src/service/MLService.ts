import axios from 'axios';

const ML_API_URL = process.env.ML_API_URL;

export async function healthCheck() {
  await axios.get(`${ML_API_URL}/`);
  return true;
}

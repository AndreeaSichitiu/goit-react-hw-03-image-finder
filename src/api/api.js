import axios from "axios";

const BASE_URL = "https://pixabay.com/api/?q=cat&page=1&key=38046505-5b9e748b87046ce765cd21b85&image_type=photo&orientation=horizontal&per_page=12"

const api = axios.create({
  baseURL: BASE_URL,
});

const resourseApi = {
    search: (query, page = 1) =>
      api.get('', {
        params: {
          q: query,
          page: page,
        },
      }),
  };

 export { resourseApi };
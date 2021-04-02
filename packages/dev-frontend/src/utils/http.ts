import axios from 'axios';

export default {
  create_site: (data: string) => axios.post('/api/v1/site/create-site', data),
  judgment_add: (data: {}) => axios.get('/api/v1/site/judgment-add', { params: data }),
}
import qs from 'qs';

export default {
  getPostParams: (obj: any) => {
    return qs.stringify(obj);
  },
}
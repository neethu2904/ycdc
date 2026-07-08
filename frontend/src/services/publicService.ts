import api from '../lib/api';

export const publicService = {
  getSeo: async () => {
    const res = await api.get('/seo');
    return res.data;
  },
  getServices: async () => {
    const res = await api.get('/services');
    return res.data;
  },
  getDoctors: async () => {
    const res = await api.get('/doctors');
    return res.data;
  },
  getGallery: async () => {
    const res = await api.get('/gallery');
    return res.data;
  },
  getBlog: async () => {
    const res = await api.get('/blog');
    return res.data;
  },
  getCaseStudies: async () => {
    const res = await api.get('/case-studies');
    return res.data;
  }
};

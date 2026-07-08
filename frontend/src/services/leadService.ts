import api from '../lib/api';

export const leadService = {
  // Public submissions
  createLead: async (data: any) => {
    const res = await api.post('/leads', data);
    return res.data;
  },

  // Dashboard / Admin operations
  getLeads: async () => {
    const res = await api.get('/leads');
    return res.data;
  },
  
  deleteLead: async (id: string | number) => {
    const res = await api.delete(`/leads/${id}`);
    return res.data;
  },
  
  deleteLeadAdmin: async (id: string | number) => {
    const res = await api.delete(`/admin/leads/${id}`);
    return res.data;
  },
  
  updateLeadStatus: async (id: string | number, status: string) => {
    const res = await api.put(`/leads/${id}/status`, { status });
    return res.data;
  },
  
  updateLeadStatusAdmin: async (id: string | number, status: string) => {
    const res = await api.put(`/admin/leads/${id}/status`, { status });
    return res.data;
  },
  
  updateLeadNotesAdmin: async (id: string | number, notes: string) => {
    const res = await api.put(`/admin/leads/${id}/notes`, { notes });
    return res.data;
  },
  
  resetLeads: async () => {
    const res = await api.post('/leads/reset');
    return res.data;
  }
};

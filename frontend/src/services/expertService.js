import api from './api';

export const expertService = {
    // Get all experts
    getAll: async () => {
        const response = await api.get('/experts');
        return response.data;
    },

    // Get online experts count
    getOnlineCount: async () => {
        const response = await api.get('/experts/online');
        return response.data;
    },

    // Get single expert
    getById: async (id) => {
        const response = await api.get(`/experts/${id}`);
        return response.data;
    },

    // Create expert
    create: async (expertData) => {
        const response = await api.post('/experts', expertData);
        return response.data;
    },

    // Update expert
    update: async (id, expertData) => {
        const response = await api.put(`/experts/${id}`, expertData);
        return response.data;
    },

    // Update online status
    updateStatus: async (id, isOnline) => {
        const response = await api.patch(`/experts/${id}/status`, { isOnline });
        return response.data;
    },

    // Delete expert
    delete: async (id) => {
        const response = await api.delete(`/experts/${id}`);
        return response.data;
    }
};

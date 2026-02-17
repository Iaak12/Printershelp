import api from './api';

export const questionService = {
    // Get all questions
    getAll: async (params = {}) => {
        const response = await api.get('/questions', { params });
        return response.data;
    },

    // Get single question
    getById: async (id) => {
        const response = await api.get(`/questions/${id}`);
        return response.data;
    },

    // Submit question
    create: async (questionData) => {
        const response = await api.post('/questions', questionData);
        return response.data;
    },

    // Update question
    update: async (id, questionData) => {
        const response = await api.put(`/questions/${id}`, questionData);
        return response.data;
    },

    // Delete question
    delete: async (id) => {
        const response = await api.delete(`/questions/${id}`);
        return response.data;
    }
};

import api from './api';

export const siteSettingsService = {
    getSettings: async () => {
        try {
            const response = await api.get('/settings');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateSettings: async (formData) => {
        try {
            const response = await api.put('/settings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

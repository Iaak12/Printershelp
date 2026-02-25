const axios = require('axios');

const testAxios = async () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000/api'
    });

    // We don't need a real server to see the final URL in the error message if it fails
    try {
        await api.get('/settings');
    } catch (err) {
        console.log('Final URL for /settings:', err.config.url);
    }

    try {
        await api.get('settings');
    } catch (err) {
        console.log('Final URL for settings:', err.config.url);
    }
};

testAxios();

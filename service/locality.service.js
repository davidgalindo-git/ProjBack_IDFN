import localityModel from '../model/locality.model.js';

const localityService = {
    getLocality: async (filters) => {
        try {
            return await localityModel.getLocality(filters);
        } catch (error) {
            throw error;
        }
    },
    setLocality: async (filters) => {
        try {
            return await localityModel.postLocality(filters);
        } catch (error) {
            throw error;
        }
    },
    updateLocality: async (filters) => {
        try {
            return await localityModel.patchLocality(filters);
        } catch (error) {
            throw error;
        }
    },
    deleteLocality: async (id) => {
        try {
            return await localityModel.deleteLocality(id);
        } catch (error) {
            throw error;
        }
    },
    isIdValid: async (id) => {
        try {
            return await localityModel.isIdValid(id);
        } catch (error) {
            throw error;
        }
    }
}

export default localityService;
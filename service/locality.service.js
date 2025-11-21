import localityModel from '../model/locality.model.js';

const localityService = {
    getLocality: async (filters) => {
        try {
            return await localityModel.selectLocality(filters);
        } catch (error) {
            console.log("Error fetching locality[service]:", error);
        }
    }
}

export default localityService;
import localityModel from '../model/locality.model.js';

const localityService = {
    getLocality: async (locality) => {
        try {
            locality = await localityModel.selectLocality(locality);
            return locality;
        } catch (error) {
            console.log("Error fetching locality[service]:", error);
        }
    }
}

export default localityService;
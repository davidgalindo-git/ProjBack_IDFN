import serviceModel from '../model/service.model.js';

const serviceService = {
    getService: async (filters = {}) => {
        try {
            const service = await serviceModel.selectService(filters);
            return service;
        } catch (error) {
            console.log("Error fetching service[service]:", error);
            throw error;
        }
    }

    postService: async (values = {}) => {
            try {
                const newService = await serviceModel.createService(values);
                return newService;
            } catch (error) {
                console.log("Error fetching service[service]:", error);
                throw error;
            }
        }
}

export default serviceService;
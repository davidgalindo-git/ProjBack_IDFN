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
    },

    postService: async (date, duration_m, location_id, dog_id) => {
        try {
            const newService = await serviceModel.createService(date, duration_m, location_id, dog_id);
            return newService;
        } catch (error) {
            console.log("Error creating service[service]:", error);
            throw error;
        }
    },

    patchService: async (id, {date, duration_m, location_id, dog_id}) => {
        try {
            const newService = await serviceModel.updateService(id, {date, duration_m, location_id, dog_id});
            return newService;
        } catch (error) {
            console.log("Error updating service[service]:", error);
            throw error;
        }
    }
}

export default serviceService;
import serviceModel from '../model/service.model.js';

let message;

const serviceService = {
    getService: async (filters = {}) => {
        console.log("service.params", filters) //success
        if (filters.id === "" || filters.date === "" || filters.duration_m === "" || filters.location === "" || filters.dog === "" ) {
            message = `Il manque l'information...`;
            const error = new Error(message);
            error.status = 400;
            console.log(error);
            throw error;
        }

        try {
            const service = await serviceModel.selectService(filters);
            return service;
        } catch (error) {
            console.log("Error fetching service[service]:", error);
            error.status = 500;
            throw error;
        }
    },

    postService: async (date, duration_m, location_id, dog_id) => {
        console.log("service.params", date, duration_m, location_id, dog_id); //success
        // Validate required fields
        if (!date || !duration_m || !location_id || !dog_id) {
            message = "Les champs 'date', 'duration_m', 'location_id' et 'dog_id' sont obligatoires.";
            const error = new Error(message);
            error.status = 400;
            console.log(error);
            throw error;
        }

        try {
            const newService = await serviceModel.createService(date, duration_m, location_id, dog_id);
            return newService;
        } catch (error) {
            console.log("Error fetching service[service]:", error);
            error.status = 500;
            throw error;
        }
    },

    patchService: async (id, {date, duration_m, location_id, dog_id}) => {
        console.log("service.params", id, date, duration_m, location_id, dog_id) //success
        try {
            const newService = await serviceModel.updateService(id, {date, duration_m, location_id, dog_id});

            if (newService.affectedRows === 0) {
                message = "Service non trouvée";
                const error = new Error(message);
                error.status = 404;
                console.log(error);
                throw error;
            }

            return newService;
        } catch (error) {
            console.log("Error fetching service[service]:", error);
            throw error;
        }
    },

    deleteService: async (id) => {
        console.log("service.params", id) //success
        try {
            const deleteService = await serviceModel.deleteService(id);

            if (deleteService.affectedRows === 0) {
                message = "Service non trouvée";
                const error = new Error(message);
                error.status = 404;
                console.log(error);
                throw error;
            }

            return deleteService;
        } catch (error) {
            console.log("Error fetching service[service]:", error);
            throw error;
        }
    }
}

export default serviceService;
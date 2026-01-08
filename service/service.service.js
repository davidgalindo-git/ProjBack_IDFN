import serviceModel from '../model/service.model.js';

let message;

const serviceService = {
    getServices: async (filters = {}) => {
        console.log("service.params", filters) //success
        /// Allowed keys
        const allowedKeys = ['date', 'duration_m', 'location', 'dog'];

        /// Keys sent by the user
        const actualKeys = Object.keys(filters);

        // Check if any key is NOT in the allowed list
        const forbiddenKeys = actualKeys.filter(key => !allowedKeys.includes(key));

        if (forbiddenKeys.length > 0) {
            const error = new Error(`Paramètre(s) non autorisé(s) : ${forbiddenKeys.join(', ')}`);
            error.status = 400;
            throw error;
        }

        const { date, duration_m, location, dog } = filters;

        /// Check non empty parameters
        if (date === "" || duration_m === "" || location === "" || dog === "" ) {
            message = `Il manque l'information...`;
            const error = new Error(message);
            error.status = 400;
            console.log(error);
            throw error;
        }

        /// Validate duration_m int format
        if (duration_m && isNaN(parseInt(duration_m))) {
            message = 'Format de donnée incorrect, le paramètre doit être un nombre entier'
            const error = new Error(message);
            error.status = 400;
            console.log(error);
            throw error;
        }

        /// Validate date format "yyyy-mm-dd hh:mm:ss"
        if (date) {
            const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!dateRegex.test(date)) {
                message = "Le format de date doit être yyyy-mm-dd hh:mm:ss";
                const error = new Error(message);
                error.status = 400;
                console.log(error);
                throw error;
            }
        }

        /// Regex: ^ (start), [a-zA-Z\s] (letters or spaces), + (one or more), $ (end)
        const alphabetRegex = /^[a-zA-Z\s]+$/;

        /// Validate Location
        if (location) {
            if (typeof location !== 'string' || location.trim() === "") {
                message = "La localité doit être une chaîne de caractères";
                const error = new Error(message);
                error.status = 400;
                console.log(error);
                throw error;
            }
            if (!alphabetRegex.test(location)) {
                message = "La localité ne doit contenir que des lettres et des espaces";
                const error = new Error(message);
                error.status = 400;
                console.log(error);
                throw error;
            }
        }

        /// Validate Dog
        if (dog) {
            if (typeof dog !== 'string' || dog.trim() === "") {
                message = "Le nom du chien doit être une chaîne de caractères";
                const error = new Error(message);
                error.status = 400;
                console.log(error);
                throw error;
            }
            if (!alphabetRegex.test(dog)) {
                message = "Le nom du chien ne doit contenir que des lettres et des espaces";
                const error = new Error(message);
                error.status = 400;
                console.log(error);
                throw error;
            }
        }

        try {
            const service = await serviceModel.selectServices(filters);

            /// Check no service found
            if (!service || (Array.isArray(service) && service.length === 0) || service.affectedRows === 0) {
                message = "Service non trouvée";
                const error = new Error(message);
                error.status = 404;
                console.log(error);
                throw error;
            }

            return service;
        } catch (error) {
            console.log("Error fetching service[service]:", error);
            throw error;
        }
    },

    getServiceById: async (id) => {
        try {
            const service = await serviceModel.selectServiceById(id);

            /// Check no service found
            if (!service || (Array.isArray(service) && service.length === 0) || service.affectedRows === 0) {
                message = "Service non trouvée";
                const error = new Error(message);
                error.status = 404;
                console.log(error);
                throw error;
            }

            return service;
        } catch (error)
        {
            console.log("Error fetching service[service]:", error);
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
            throw error;
        }
    },

    patchService: async (id, {date, duration_m, location_id, dog_id}) => {
        console.log("service.params", id, date, duration_m, location_id, dog_id) //success
        try {
            const newService = await serviceModel.updateService(id, {date, duration_m, location_id, dog_id});

            /// Check no service found
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

            /// Check no service found
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
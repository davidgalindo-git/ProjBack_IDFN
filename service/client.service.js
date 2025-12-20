import clientModel from '../model/client.model.js';

const clientService = {
    getClient: async (filters) => {
        try {
            return await clientModel.selectClient(filters);
        } catch (error) {
            console.log("Error fetching client[service]:", error);
        }
    },
    createClient: async (filters) => {
        try {
            return await clientModel.createClient(filters);
        } catch (error) {
            console.log("Error creating client[service]:", error);
        }
    },
    updateClient: async (id,filters) => {
        try {
            return await clientModel.updateClient(id,filters);
        } catch (error) {
            console.log("Error creating client[service]:", error);
        }
    }
}

export default clientService;
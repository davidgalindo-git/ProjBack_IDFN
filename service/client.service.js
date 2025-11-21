import clientModel from '../model/client.model.js';

const clientService = {
    getClient: async (client) => {
        try {
            client = await clientModel.selectClient(client);
            return client;
        } catch (error) {
            console.log("Error fetching client[service]:", error);
        }
    }
}

export default clientService;
import clientModel from '../model/client.model.js';

const clientService = {
    getClient: async (filters) => {
        const query = {};
        if (filters.id) query.id = filters.id;
        if (filters.lastname) query.lastname = filters.lastname;
        if (filters.firstname) query.firstname = filters.firstname;
        if (filters.genre) query.genre = filters.genre;
        if (filters.email) query.email = filters.email;
        if (filters.phone_number) query.phone_number = filters.phone_number;
        if (filters.address) query.address = filters.address;

        // try {
        //     client = await clientModel.selectClient(client);
        //     return client;
        // } catch (error) {
        //     console.log("Error fetching client[service]:", error);
        // }

        try {
            let client = await clientModel.selectClient(query);
            return client;
        } catch (error) {
            console.log("Error fetching client[service]:", error);
        }
    }
}

export default clientService;
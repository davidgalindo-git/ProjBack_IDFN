import dogsModel from "../model/dogs.model.js";

const dogsService = {
    getDogs: async (filters) => {
        try {
            const dogs = await dogsModel.selectDogs(filters);
            console.log("Dogs fetched : ", dogs);
            return dogs;

        } catch (error) {
            console.log("Error fetching locality[service]:", error);
        }
    },
    createDog: async (dogData) => {
        try {
            const newDog = await dogsModel.insertDog(dogData);
            return newDog;
        } catch (error) {
            console.log("Erreur création chien [service]:", error);
            throw error;
        }
    },
    updateDog: async (id, data) => {
        try {
            return await dogsModel.updateDog(id, data);
        } catch (error) {
            console.log("Erreur update chien :", error);
            throw error;
        }
    },
    deleteDog: async (id) => {
        try {
            const deleted = await dogsModel.deleteDog(id);

            if (deleted === 0) {
                throw new Error("Aucun chien trouvé pour cet ID.");
            }

            return deleted;

        } catch (error) {
            throw error;
        }
    }

}



export default dogsService;
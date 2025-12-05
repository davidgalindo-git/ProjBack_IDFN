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
    }
}

export default dogsService;
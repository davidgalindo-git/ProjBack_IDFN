import dogsModel from "../model/dogs.model.js";

const dogsService = {

        getDogs: async (filters = {}) => {
            const cleanFilters = {};

            // ==========================
            // ID (AJOUTÉ, le reste inchangé)
            // ==========================
            if (filters.id !== undefined) {
                const id = Number(filters.id);
                if (isNaN(id)) {
                    throw new Error("ID du chien invalide");
                }
                cleanFilters.id = id;
            }

            // ==========================
            // Name
            // ==========================
            if (filters.name) {
                cleanFilters.name = filters.name.trim();
            }

            // ==========================
            // Sex
            // ==========================
            if (filters.sex) {
                if (!["M", "F"].includes(filters.sex)) {
                    throw new Error("Sexe invalide (M ou F)");
                }
                cleanFilters.sex = filters.sex;
            }

            // ==========================
            // Boolean fields (0 / 1)
            // ==========================
            const booleanFields = ["is_mixed", "is_sterilized", "is_deceased"];

            for (const field of booleanFields) {
                if (filters[field] !== undefined) {
                    const value = Number(filters[field]);
                    if (![0, 1].includes(value)) {
                        throw new Error(`Valeur invalide pour ${field}`);
                    }
                    cleanFilters[field] = value;
                }
            }

            // ==========================
            // Birthdate
            // ==========================
            if (filters.birthdate) {
                const date = new Date(filters.birthdate);
                if (isNaN(date.getTime())) {
                    throw new Error("Date de naissance invalide");
                }
                cleanFilters.birthdate = date;
            }

            // ==========================
            // Client / Race
            // ==========================
            if (filters.client_name) {
                cleanFilters.client_name = filters.client_name.trim();
            }

            if (filters.race_name) {
                cleanFilters.race_name = filters.race_name.trim();
            }

            // ==========================
            // Appel model (INCHANGÉ)
            // ==========================
            try {
                return await dogsModel.selectDogs(cleanFilters);
            } catch (error) {
                throw new Error("Erreur lors de la récupération des chiens");
            }
        },

    // ==========================
    // POST
    // ==========================
    createDog: async (dogData) => {
        if (!dogData || Object.keys(dogData).length === 0) {
            throw new Error("Les données du chien sont manquantes");
        }

        try {
            const newDog = await dogsModel.insertDog(dogData);
            return newDog;
        } catch (error) {
            throw new Error("Erreur lors de la création du chien");
        }
    },

    // ==========================
    // PATCH
    // ==========================
    updateDog: async (id, data) => {
        if (!id || isNaN(id)) {
            throw new Error("ID du chien invalide");
        }

        if (!data || Object.keys(data).length === 0) {
            throw new Error("Aucune donnée à mettre à jour");
        }

        try {
            const updated = await dogsModel.updateDog(id, data);

            if (!updated) {
                throw new Error("Chien introuvable");
            }

            return updated;
        } catch (error) {
            throw new Error("Erreur lors de la mise à jour du chien");
        }
    },

    // ==========================
    // DELETE
    // ==========================
    deleteDog: async (id) => {
        if (!id || isNaN(id)) {
            throw new Error("ID du chien invalide");
        }

        try {
            const deleted = await dogsModel.deleteDog(id);

            if (deleted === 0) {
                throw new Error("Aucun chien trouvé pour cet ID");
            }

            return deleted;
        } catch (error) {
            throw new Error("Erreur lors de la suppression du chien");
        }
    },
};

export default dogsService;

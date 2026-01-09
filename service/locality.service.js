import localityModel from '../model/locality.model.js';


const localityService = {
    selectLocality: async (filters) => {
        // Filtres autorisés
        const authorizedFilters = ['id', 'name', 'postal_code', 'postal_code_complement', 'toponym', 'canton_code', 'language_code'];
        for (let filter in filters) {
            if (!authorizedFilters.find(element => element === filter)) {
                const err = new Error(`Le filtre ${filter} n'est pas autorisé.`);
                err.status = 400;
                throw err;
            }
        }

        const {id, name, postal_code, postal_code_complement, toponym, canton_code, language_code} = filters;

        // Validation des données
        if (id !== undefined) {
            if (isNaN(id) || !await localityModel.isIdValid(id)){
                const err = new Error("L'ID n'est pas valide.")
                err.status = 400;
                throw err;
            }
        }

        if (id === "" || name === "" || postal_code === "" || postal_code_complement === "" || toponym === "" || canton_code === "" || language_code === ""){
            const err = new Error("Il manque une information...");
            err.status = 400;
            throw err;
        }

        let locality;
        try {
            locality = await localityModel.selectLocality(filters);
        } catch (error) {
            throw error;
        }

        if (locality.length === 0) {
            const err = new Error(`Aucune localité n'a été trouvé`);
            err.status = 404;
            throw err;
        }

        return locality;
    },
    createLocality: async (filters) => {
        const {name, postal_code, postal_code_complement, toponym, canton_code, language_code} = filters;

        // Validation des données
        if (name === "" || name === undefined || name.length < 1 || name.length > 45) {
            const err = new Error("Le nom doit être compris entre 1 et 45 caractères.")
            err.status = 400;
            throw err;
        }
        if (postal_code === "" || postal_code === undefined || postal_code.length < 1 || postal_code.length > 4 || isNaN(postal_code)) {
            const err = new Error(`Le code postal doit être compris entre 1 et 4 chiffres.`);
            err.status = 400;
            throw err;
        }
        if (postal_code_complement === "" ||
            postal_code_complement === undefined ||
            postal_code_complement.length !== 1 ||
            !/^[A-Z]+$/.test(postal_code_complement)) {     // Test si alphabet seulement
            const err = new Error("Le complément du code postal doit être de 1 lettre majuscule.")
            err.status = 400;
            throw err;
        }
        if (toponym === "" || toponym === undefined || toponym.length < 1 || toponym.length > 45 || !/^[a-zA-Z]+$/.test(toponym)) {
            const err = new Error("Le toponyme doit être compris entre 1 et 4 lettres.")
            err.status = 400;
            throw err;
        }
        if (canton_code === "" || canton_code === undefined || canton_code.length !== 2 || !/^[A-Z]+$/.test(canton_code)) {
            const err = new Error("Le code du canton doit être de 2 lettres majuscules.")
            err.status = 400;
            throw err;
        }
        if (language_code === "" || language_code === undefined || language_code.length > 3 || !/^[A-Z]+$/.test(language_code)){
            const err = new Error("Le code de la langue doit être compris entre 1 et 3 lettres.")
            err.status = 400;
            throw err;
        }

        // Appel du model
        let locality;
        try {
            locality = await localityModel.createLocality(filters);
        } catch (error) {
            throw error;
        }

        if (locality < 1) {
            const err = new Error(`Erreur dans l'ajout de la localité.`);
            err.status = 500;
            throw err;
        }

        return locality
    },
    updateLocality: async (id, filters) => {
        // Check si l'ID est valide
        if (!await localityModel.isIdValid(id)){
            const err = new Error("L'ID n'est pas valide.")
            err.status = 400;
            throw err;
        }

        // Appel du model
        let locality;
        try {
            locality = await localityModel.updateLocality(id, filters);
        } catch (error) {
            throw error;
        }

        if (locality.length < 1) {
            const err = new Error(`Erreur dans la mise à jour de la localité avec l'ID ${id}`);
            err.status = 500;
            throw err;
        }

        return locality;
    },
    deleteLocality: async (id) => {
        // Vérification de l'ID
        if (!await localityModel.isIdValid(id)){
            const err = new Error("L'ID n'est pas valide.")
            err.status = 400;
            throw err;
        }

        // Appel du model
        let locality;
        try {
            locality = await localityModel.deleteLocality(id);
        } catch (error) {
            throw error;
        }

        if (locality < 1) {
            const err = new Error(`Erreur dans la suppression de la localité avec l'ID ${id}`);
            err.status = 500;
            throw err;
        }

        return locality;
    }
}

export default localityService;
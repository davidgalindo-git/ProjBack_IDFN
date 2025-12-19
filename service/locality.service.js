import localityModel from '../model/locality.model.js';


const localityService = {
    getLocality: async (filters) => {
        const {name, postal_code, postal_code_complement, toponym, canton_code, language_code} = filters;

        if (name === "" || postal_code === "" || postal_code_complement === "" || toponym === "" || canton_code === "" || language_code === ""){
            throw Error("Il manque une information...");
        }

        try {
            return localityModel.getLocality(filters);

        } catch (error) {
            throw error;
        }
    },
    setLocality: async (filters) => {
        const {name, postal_code, postal_code_complement, toponym, canton_code, language_code} = filters;

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

        try {
            return await localityModel.postLocality(filters);
        } catch (error) {
            throw error;
        }
    },
    updateLocality: async (id, filters) => {
        if (await localityModel.isIdValid(id)) {
            try {
                return await localityModel.patchLocality(id, filters);
            } catch (error) {
                throw error;
            }
        } else {
            const err = new Error(`L'ID de la localité n'existe pas.`);
            err.status = 404;
            throw err;
        }
    },
    deleteLocality: async (id) => {
        if (await localityModel.isIdValid(id)) {
            try {
                return await localityModel.deleteLocality(id);
            } catch (error) {
                throw error;
            }
        } else {
            const err = new Error(`L'ID de la localité n'existe pas.`);
            err.status = 404;
            throw err;
        }
    }
}

export default localityService;
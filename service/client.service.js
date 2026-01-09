/**
 * File: client.service.js
 * Description: Service handling business logic and validation for Client entities.
 * Date: 09/01/2026
 * Author: Nathan Filipowitz
 */
import clientModel from '../model/client.model.js';

const clientService = {
    getClient: async (filters) => {
        const authorizedFilters = ['id', 'lastname', 'firstname', 'genre', 'email', 'phone_number', 'address'];
        for (let filter in filters) {
            if (!authorizedFilters.find(element => element === filter)) {
                const err = new Error(`Le filtre ${filter} n'est pas autorisé.`);
                err.status = 400;
                throw err;
            }
        }

        const {id, lastname, firstname, genre, email, phone_number, address} = filters;

        if (id !== undefined) {
            if (isNaN(id) || !await clientModel.isIdValid(id)){
                const err = new Error("L'ID n'est pas valide.")
                err.status = 400;
                throw err;
            }
        }

        if (id === "" || lastname === "" || firstname === "" || genre === "" || email === "" || phone_number === "" || address === ""){
            const err = new Error("Il manque une information...");
            err.status = 400;
            throw err;
        }

        let client;

        try {
            client = await clientModel.selectClient(filters);
        } catch (error) {
            throw error;
        }

        if (client.length === 0) {
            const err = new Error(`Aucun client n'a été trouvé`);
            err.status = 404;
            throw err;
        }

        return client;
    },
    createClient: async (filters) => {
        const {lastname, firstname, genre, email, phone_number, address} = filters;
        if (lastname === "" || lastname === undefined || lastname.length < 1 || lastname.length > 45) {
            const err = new Error("Le nom de famille doit être compris entre 1 et 45 caractères.")
            err.status = 400;
            throw err;
        }
        if (firstname === "" || firstname === undefined || firstname.length < 1 || firstname.length > 45) {
            const err = new Error("Le prénom doit être compris entre 1 et 45 caractères.")
            err.status = 400;
            throw err;
        }
        if (genre === "" || genre === undefined || genre.length !== 1 || !/^[A-Z]$/.test(genre)) {
            const err = new Error("Le genre doit être une seule lettre majuscule (M ou F).")
            err.status = 400;
            throw err;
        }
        // source for email validation regex: https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
        if (email === "" || email === undefined || email.length < 5 || email.length > 255 || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            const err = new Error("L'adresse email n'est pas valide.")
            err.status = 400;
            throw err;
        }
        // source for phone number validation regex: https://www.geeksforgeeks.org/javascript/how-to-validate-phone-numbers-using-javascript/
        if (phone_number === "" || phone_number === undefined || !/^\d{10}$/.test(phone_number)) {
            const err = new Error(`Le numéro de téléphone doit être composé de 10 chiffres.`);
            err.status = 400;
            throw err;
        }
        if (address === "" || address === undefined || address.length < 5 || address.length > 255) {
            const err = new Error("L'adresse doit être comprise entre 5 et 255 caractères.")
            err.status = 400;
            throw err;
        }

        let client;
        try {
            client = await clientModel.createClient(filters);
        } catch (error) {
            throw error;
        }

        if (client < 1) {
            const err = new Error(`Erreur dans la création du client.`);
            err.status = 500;
            throw err;
        }

        return client
    },
    updateClient: async (id, filters) => {
        if (!await clientModel.isIdValid(id)){
            const err = new Error("L'ID n'est pas valide.")
            err.status = 400;
            throw err;
        }

        let client;
        try {
            client = await clientModel.updateClient(id, filters);
        } catch (error) {
            throw error;
        }

        if (client.length < 1) {
            const err = new Error(`Erreur dans la mise à jour du client avec l'ID ${id}`);
            err.status = 500;
            throw err;
        }

        return client;
    },
    deleteClient: async (id) => {
        if (!await clientModel.isIdValid(id)){
            const err = new Error("L'ID n'est pas valide.")
            err.status = 400;
            throw err;
        }

        let client;
        try {
            client = await clientModel.deleteClient(id);
        } catch (error) {
            throw error;
        }

        if (client < 1) {
            const err = new Error(`Erreur dans la suppression du client avec l'ID ${id}`);
            err.status = 500;
            throw err;
        }

        return client;
    }
}

export default clientService;
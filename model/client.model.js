import { db } from '../db/db.js'

const clientModel = {
    selectClient: async (filters) => {
        let con;
        try {
            con = await db.connectToDB()

            let sql = "SELECT * FROM clients WHERE 1=1"; //returns all clients if no parameters are added to the url
            let params = [];

            if (filters.id) {
                sql += " AND id LIKE ?";
                params.push(`%${filters.id}%`);
            }
            if (filters.lastname) {
                sql += " AND lastname LIKE ?";
                params.push(filters.lastname);
            }
            if (filters.firstname) {
                sql += " AND firstname LIKE ?";
                params.push(filters.firstname);
            }
            if (filters.genre) {
                sql += " AND genre = ?";
                params.push(filters.genre);
            }
            if (filters.email) {
                sql += " AND email LIKE ?";
                params.push(filters.email);
            }
            if (filters.phone_number) {
                sql += " AND phone_number LIKE ?";
                params.push(filters.phone_number);
            }
            if (filters.address) {
                sql += " AND address LIKE ?";
                params.push(filters.address);
            }

            const [rows] = await con.query(sql, params);
            return rows;
        } catch (error) {
            console.log("Error fetching client:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    createClient: async (filters) => {
        let con;
        try {
            con = await db.connectToDB();
            if (!filters.lastname || filters.lastname.length === 0) {
                filters.lastname = null;
            }
            if (!filters.firstname || filters.firstname.length === 0) {
                filters.firstname = null;
            }
            if (!filters.genre || filters.genre.length === 0) {
                filters.genre = null;
            }
            if (!filters.email || filters.email.length === 0) {
                filters.email = null;
            }
            if (!filters.phone_number || filters.phone_number.length === 0) {
                filters.phone_number = null;
            }
            if (!filters.address || filters.address.length === 0) {
                filters.address = null;
            }
            const [rows] = await con.query("INSERT INTO WhatTheDog.clients (lastname, firstname, genre, email, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)", [filters.lastname, filters.firstname, filters.genre, filters.email, filters.phone_number, filters.address]);
            return rows;
        } catch (error) {
            console.log("Error fetching client:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    updateClient: async (id, filters) => {
        let con;
        try {
            con = await db.connectToDB();
            let sql = "UPDATE WhatTheDog.clients SET ";
            const params = [];
            const updates = [];

            if (filters.lastname) {
                updates.push("lastname = ?");
                params.push(filters.lastname);
            }
            if (filters.firstname) {
                updates.push("firstname = ?");
                params.push(filters.firstname);
            }
            if (filters.genre) {
                updates.push("genre = ?");
                params.push(filters.genre);
            }
            if (filters.email) {
                updates.push("email = ?");
                params.push(filters.email);
            }
            if (filters.phone_number) {
                updates.push("phone_number = ?");
                params.push(filters.phone_number);
            }
            if (filters.address) {
                updates.push("address = ?");
                params.push(filters.address);
            }

            // mettre des virgules à chaque valeur de la liste
            sql += updates.join(", ");

            if (id) {
                sql += " WHERE id = ?";
                params.push(id);
            }

            const [rows] = await con.query(sql, params);
            return rows;
        } catch (error) {
            console.log("Error updating client:", error);
            throw error;
        } finally {
            if (con) await db.disconnectToDB(con);
        }
    },
    deleteClient: async (id) => {
        let con;
        try {
            con = await db.connectToDB();

            // supprimmer les chiens du client
            const [dogs] = await con.query('SELECT id FROM WhatTheDog.dogs WHERE client_id = ?', [id]);
            if (dogs.length > 0) {
                // liste d'id de chiens
                const dogIds = dogs.map(dog => dog.id);
                // supprimer les chiens du tableau dogs_has_diseases
                await con.query('DELETE FROM WhatTheDog.dogs_has_diseases WHERE dog_id IN (?)', [dogIds]);
                // supprimer les chiens du tableau services
                await con.query('DELETE FROM WhatTheDog.services WHERE dog_id IN (?)', [dogIds]);
                // on peut enfin supprimer les chiens
                await con.query('DELETE FROM WhatTheDog.dogs WHERE client_id = ?', [id]);
            }
            // et on peut supprimer le client
            const [rows] = await con.query('DELETE FROM WhatTheDog.clients WHERE id = ?', [id]);
            return rows.affectedRows;
        } catch (error) {
            throw error;
        } finally {
            if (con) await db.disconnectToDB(con);
        }
    },
    isIdValid: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const rows = await con.query('SELECT * FROM clients WHERE id = ?', [id]);
            return rows[0].length > 0;
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    }
}

export default clientModel;
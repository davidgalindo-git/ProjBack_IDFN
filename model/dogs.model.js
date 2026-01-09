/**
 * File: dogs.model.js
 * Description: Model handling SQL queries for dogs entities.
 * Date: 09/01/2026
 * Author: Imad El Khattabi
 */
import { db } from '../db/db.js'

const DogsModel = {
    //=====================
    // GET ALL DOGS
    //=====================
    selectDogs: async (filters) => {
        let con;
        try {
            con = await db.connectToDB();

            let sql = `
                SELECT dogs.id, dogs.name, dogs.sex, dogs.is_mixed, dogs.birthdate, dogs.is_sterilized, dogs.is_deceased,
                       races.name as race_name, CONCAT(clients.firstname,' ',clients.lastname) AS client_name
                FROM dogs
                         LEFT JOIN races ON dogs.race_id = races.id
                         LEFT JOIN clients ON dogs.client_id = clients.id
                WHERE 1=1
            `;
            let params = [];


            if (filters.name) {
                sql += " AND dogs.name LIKE ?";
                params.push(`%${filters.name}%`);
            }

            if (filters.sex) {
                sql += " AND dogs.sex = ?";
                params.push(filters.sex);
            }

            if (filters.is_mixed !== undefined) {
                sql += " AND dogs.is_mixed = ?";
                params.push(filters.is_mixed);
            }

            if (filters.birthdate !== undefined) {
                sql += " AND dogs.birthdate = ?";
                params.push(filters.birthdate.toISOString().split('T')[0]);
            }

            if (filters.is_sterilized !== undefined) {
                sql += " AND dogs.is_sterilized = ?";
                params.push(filters.is_sterilized);
            }

            if (filters.is_deceased !== undefined) {
                sql += " AND dogs.is_deceased = ?";
                params.push(filters.is_deceased);
            }

            if (filters.client_name !== undefined) {
                sql += `
                AND (
                    clients.firstname LIKE ?
                    OR clients.lastname LIKE ?
                    OR CONCAT(clients.firstname,' ',clients.lastname) LIKE ?
                )
            `;
                const pattern = `%${filters.client_name}%`;
                params.push(pattern, pattern, pattern);
            }

            if (filters.race_name !== undefined) {
                sql += " AND races.name LIKE ?";
                params.push(filters.race_name);
            }

            const [rows] = await con.query(sql, params);
            return rows;

        } catch (error) {
            console.log("Erreur selectDogs [model] :", error.message);
            throw error; // <--- indispensable pour que service/route gèrent l'erreur
        } finally {
            if (con) await db.disconnectToDB(con);
        }
    },

    //=====================
    // GET BY ID
    //====================
    getIdDog: async (id) => {
        const query = `
            SELECT
                d.*,
                c.id AS client_id,
                r.id AS race_id
            FROM dogs d
                     LEFT JOIN clients c ON c.id = d.client_id
                     LEFT JOIN races r   ON r.id = d.race_id
            WHERE d.id = ?;
        `;

        const con = await db.connectToDB();

        const [rows] = await con.execute(query, [id]);

        await db.disconnectToDB(con);


        // Si aucun chien trouvé
        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    },

    //================
    // INSERT DOG
    //================

    insertDog: async (dog) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = `
            INSERT INTO dogs (name, sex, is_mixed, birthdate, is_sterilized, is_deceased, race_id, client_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
            const params = [
                dog.name,
                dog.sex,
                dog.is_mixed || 0,
                dog.birthdate ? new Date(dog.birthdate).toISOString().split('T')[0] : null,
                dog.is_sterilized || 0,
                dog.is_deceased || 0,
                dog.race_id || null,
                dog.client_id || null
            ];

            const [result] = await con.query(sql, params);
            return { id: result.insertId, ...dog }; // retourne le chien ajouté avec son id
        } finally {
            await db.disconnectToDB(con);
        }
    },

    //====================
    // UPDATE DOG
    //====================

    updateDog: async (id, dog) => {
        let con;
        try {
            con = await db.connectToDB();

            const fields = [];
            const params = [];

            if (dog.name !== undefined) {
                fields.push("name = ?");
                params.push(dog.name);
            }
            if (dog.sex !== undefined) {
                fields.push("sex = ?");
                params.push(dog.sex);
            }
            if (dog.is_mixed !== undefined) {
                fields.push("is_mixed = ?");
                params.push(dog.is_mixed);
            }
            if (dog.birthdate !== undefined) {
                params.push(new Date(dog.birthdate).toISOString().split('T')[0]);
                fields.push("birthdate = ?");
            }
            if (dog.is_sterilized !== undefined) {
                fields.push("is_sterilized = ?");
                params.push(dog.is_sterilized);
            }
            if (dog.is_deceased !== undefined) {
                fields.push("is_deceased = ?");
                params.push(dog.is_deceased);
            }
            if (dog.race_id !== undefined) {
                fields.push("race_id = ?");
                params.push(dog.race_id);
            }
            if (dog.client_id !== undefined) {
                fields.push("client_id = ?");
                params.push(dog.client_id);
            }

            if (fields.length === 0) {
                throw new Error("Aucun champ à mettre à jour");
            }

            const sql = `UPDATE dogs SET ${fields.join(", ")} WHERE id = ?`;
            params.push(id);

            await con.query(sql, params);

            const [rows] = await con.query("SELECT * FROM dogs WHERE id = ?", [id]);
            return rows[0];
        } finally {
            await db.disconnectToDB(con);
        }
    },


    //=======================
    // DELETE DOG
    //=======================
    deleteDog: async (id) => {
        let con;
        try {
            con = await db.connectToDB();

            const [result] = await con.query(
                "DELETE FROM dogs WHERE id = ?",
                [id]
            );

            return result.affectedRows;  // <--- important
        } finally {
            await db.disconnectToDB(con);
        }
    }


}

export default DogsModel;
import { db } from '../db/db.js'

const DogsModel = {

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

            if(filters.id !== undefined){
                sql += " AND dogs.id = ?";
                params.push(filters.id);
            }

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
                sql += " AND (clients.firstname LIKE ? OR clients.lastname LIKE ? OR CONCAT(clients.firstname,' ',clients.lastname) LIKE ?)";
                const namePattern = `%${filters.client_name}%`; // ajoute les % pour la recherche partielle
                params.push(namePattern, namePattern, namePattern);
            }


            if (filters.race_name !== undefined) {
                sql += " AND races.name = ?";
                params.push(filters.race_name);
            }

            const [rows] = await con.query(sql, params);
            return rows;

        } finally {
            await db.disconnectToDB(con);
        }
    },
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
    updateDog: async (id, dog) => {
        let con;
        try {
            con = await db.connectToDB();

            const sql = `
            UPDATE dogs
            SET name = ?, sex = ?, is_mixed = ?, birthdate = ?, is_sterilized = ?, is_deceased = ?, race_id = ?, client_id = ?
            WHERE id = ?
        `;

            const params = [
                dog.name,
                dog.sex,
                dog.is_mixed,
                dog.birthdate ? new Date(dog.birthdate).toISOString().split('T')[0] : null,
                dog.is_sterilized,
                dog.is_deceased,
                dog.race_id,
                dog.client_id,
                id
            ];

            await con.query(sql, params);

            return { id, ...dog };

        } finally {
            await db.disconnectToDB(con);
        }
    }

}

export default DogsModel;
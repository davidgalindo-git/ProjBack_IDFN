import { db } from '../db/db.js'

const clientModel = {
    selectAllClients: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM clients');
            return rows[0];
        } catch (error) {
            console.log("Error fetching clients:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },

    selectClient: async (filters) => {
        let con;
        try {
            con = await db.connectToDB()
            let sql = "SELECT * FROM clients WHERE 1=1";
            let params = [];

            if (filters.id) {
                sql += " AND id = ?";
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
            // const searchPattern = `%${client}%`;
            // const rows = await con.query('SELECT * FROM clients WHERE id LIKE ?', [searchPattern]);
            // console.log(searchPattern)
            // return rows[0];
        } catch (error) {
            console.log("Error fetching client:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
}

export default clientModel;
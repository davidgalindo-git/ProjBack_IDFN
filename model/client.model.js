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

    selectClient: async (client) => {
        let con;
        try {
            con = await db.connectToDB()
            const searchPattern = `%${client}%`;
            const rows = await con.query('SELECT * FROM clients WHERE id LIKE ?', [searchPattern]);
            return rows[0];
        } catch (error) {
            console.log("Error fetching client:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
}

export default clientModel;
import { db } from '../db/db.js'

const localityModel = {
    selectAllLocalities: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM locations');
            return rows[0];
        } catch (error) {
            console.log("Error fetching location:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },

    selectLocality: async (locality) => {
        let con;
        try {
            con = await db.connectToDB()
            const searchPattern = `%${locality}%`;
            const rows = await con.query('SELECT * FROM locations WHERE name LIKE ?', [searchPattern]);
            return rows[0];
        } catch (error) {
            console.log("Error fetching location:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
}

export default localityModel;
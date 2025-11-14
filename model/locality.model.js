import { db } from '../db/db.js'

const localityModel = {
    selectAllLocalities: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM localities');
            return rows[0];
        } catch (error) {
            console.log("Error fetching contacts:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },

    selectLocality: async (locality) => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM pizzas WHERE name LIKE "%?%"', [locality]);
            console.log(rows);
            return rows[0];
        } catch (error) {
            console.log("Error fetching contacts:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
}

export default localityModel;
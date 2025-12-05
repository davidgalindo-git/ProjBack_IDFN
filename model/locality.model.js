import { db } from '../db/db.js'

const localityModel = {
    selectLocality: async (filters) => {
        let con;
        try {
            con = await db.connectToDB();

            let sql = "SELECT * FROM locations WHERE 1=1";
            let params = [];

            if (filters.name) {
                sql += " AND name LIKE ?";
                params.push(`%${filters.name}%`);
            }
            if (filters.postal_code) {
                sql += " AND postal_code = ?";
                params.push(filters.postal_code);
            }
            if (filters.postal_code_complement) {
                sql += " AND postal_code_complement = ?";
                params.push(filters.postal_code_complement);
            }
            if (filters.toponym) {
                sql += " AND toponym = ?";
                params.push(filters.toponym);
            }
            if (filters.canton_code) {
                sql += " AND canton_code = ?";
                params.push(filters.canton_code);
            }
            if (filters.lang_code) {
                sql += " AND language_code = ?";
                params.push(filters.lang_code);
            }

            const [rows] = await con.query(sql, params);
            return rows [0];
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    },
}

const localityHelpers = {

}

export default localityModel;
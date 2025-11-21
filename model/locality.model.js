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
            if (filters.postalCode) {
                sql += " AND postal_code = ?";
                params.push(filters.postalCode);
            }
            if (filters.postalCodeComplement) {
                sql += " AND postal_code_complement = ?";
                params.push(filters.postalCodeComplement);
            }
            if (filters.toponyme) {
                sql += " AND toponym = ?";
                params.push(filters.toponyme);
            }
            if (filters.canton) {
                sql += " AND canton_code = ?";
                params.push(filters.canton);
            }
            if (filters.langCode) {
                sql += " AND language_code = ?";
                params.push(filters.langCode);
            }

            const [rows] = await con.query(sql, params);
            return rows;
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
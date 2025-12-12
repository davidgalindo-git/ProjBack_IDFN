import { db } from '../db/db.js'

const localityModel = {
    getLocality: async (filters) => {
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
            if (filters.language_code) {
                sql += " AND language_code = ?";
                params.push(filters.language_code);
            }

            const [rows] = await con.query(sql, params);
            return rows;
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    postLocality: async (filters) => {
        let con;
        try {
            con = await db.connectToDB();
            const rows = await con.query('INSERT INTO locations (name, postal_code, postal_code_complement, toponym, canton_code, language_code) VALUES (?, ?, ?, ?, ?, ?)', [filters.name, filters.postal_code, filters.postal_code_complement, filters.toponym, filters.canton_code, filters.language_code]);
            return rows[0];
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    patchLocality: async (filters) => {
        let con;
        try {
            con = await db.connectToDB();

            let sql = "UPDATE locations SET";
            let params = [];

            if (filters.name !== null) {
                sql += " name = ?";
                params.push(filters.name);
            }
            if (filters.postal_code !== null) {
                sql += ", postal_code = ?";
                params.push(filters.postal_code);
            }
            if (filters.postal_code_complement !== null) {
                sql += ", postal_code_complement = ?";
                params.push(filters.postal_code_complement);
            }
            if (filters.toponym !== null) {
                sql += ", toponym = ?";
                params.push(filters.toponym);
            }
            if (filters.canton_code !== null) {
                sql += ", canton_code = ?";
                params.push(filters.canton_code);
            }
            if (filters.language_code !== null) {
                sql += ", language_code = ?";
                params.push(filters.language_code);
            }
            sql += " WHERE id = ?;"
            params.push(filters.id);

            const [rows] = await con.query(sql, params);
            return rows.affectedRows;
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    deleteLocality: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const [rows_link] = await con.query('DELETE FROM services WHERE location_id = ?', id);

            if (rows_link.affectedRows >= 1){
                const [rows] = await con.query('DELETE FROM locations WHERE id = ?', id);
                return rows.affectedRows;
            }
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    isIdValid: async (id) => {
        let con;
        try {
            con = await db.connectToDB();
            const rows = await con.query('SELECT * FROM locations WHERE id = ?', [id]);
            return rows[0].length > 0;
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    }
}

export default localityModel;
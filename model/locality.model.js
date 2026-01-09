/**
 * File: locality.model.js
 * Description: Model handling SQL queries for locality entities.
 * Date: 09/01/2026
 * Author: Fabian Rostello
 */
import { db } from '../db/db.js'

const localityModel = {
    selectLocality: async (filters) => {
        let con;
        try {
            con = await db.connectToDB();

            // Créer la requête de base
            let sql = "SELECT * FROM locations WHERE 1=1";
            let params = [];

            if (filters.id) {
                sql += " AND id = ?";
                params.push(filters.id);
            }
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
                sql += " AND toponym LIKE ?";
                params.push(`%${filters.toponym}%`);
            }
            if (filters.canton_code) {
                sql += " AND canton_code LIKE ?";
                params.push(`%${filters.canton_code}%`);
            }
            if (filters.language_code) {
                sql += " AND language_code LIKE ?";
                params.push(`%${filters.language_code}%`);
            }

            const [rows] = await con.query(sql, params);
            return rows;
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    createLocality: async (filters) => {
        let con;
        try {
            con = await db.connectToDB();
            const sql = 'INSERT INTO locations (name, postal_code, postal_code_complement, toponym, canton_code, language_code) VALUES (?, ?, ?, ?, ?, ?)'
            const [rows] = await con.query(sql, [filters.name, filters.postal_code, filters.postal_code_complement, filters.toponym, filters.canton_code, filters.language_code]);
            return rows.insertId;
        } catch (error) {
            throw SQLException;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    updateLocality: async (id, filters) => {
        let con;
        try {
            con = await db.connectToDB();

            // Créer la requête de mise à jour dynamique
            let sql = "UPDATE locations SET";
            let params = [];

            if (filters.name !== undefined) {
                sql += " name = ?";
                params.push(filters.name);
            }
            if (filters.postal_code !== undefined) {
                sql += ", postal_code = ?";
                params.push(filters.postal_code);
            }
            if (filters.postal_code_complement !== undefined) {
                sql += ", postal_code_complement = ?";
                params.push(filters.postal_code_complement);
            }
            if (filters.toponym !== undefined) {
                sql += ", toponym = ?";
                params.push(filters.toponym);
            }
            if (filters.canton_code !== undefined) {
                sql += ", canton_code = ?";
                params.push(filters.canton_code);
            }
            if (filters.language_code !== undefined) {
                sql += ", language_code = ?";
                params.push(filters.language_code);
            }
            sql += " WHERE id = ?;"
            params.push(id);

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

            // Si des lignes ont été affectées, supprimer la localité
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

    // Helper pour vérifier si un ID de localité est valide
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
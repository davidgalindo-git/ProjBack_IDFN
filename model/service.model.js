import mysql from 'mysql2/promise';
import { db } from '../db/db.js';

const serviceModel = {
    selectService: async (filters = {}) => {
        let con;
        try {
            con = await db.connectToDB()

            let sql = `
                SELECT 
                    services.id, 
                    services.date, 
                    services.duration_m, 
                    locations.name AS location, 
                    dogs.name AS dog
                FROM services
                INNER JOIN locations ON services.location_id = locations.id
                INNER JOIN dogs ON services.dog_id = dogs.id
                WHERE 1 = 1
            `;

            let params = [];

            if (filters.id) {
                sql += " AND services.id = ?";
                params.push(filters.id);
            }

            if (filters.date){
                sql += " AND date = ?";
                params.push(filters.date);
            }

            if (filters.duration_m){
                sql += " AND duration_m = ?";
                params.push(filters.duration_m);
            }

            if (filters.location) {
                sql += " AND locations.name LIKE ?";
                params.push(`%${filters.location}%`);
            }

            if (filters.dog) {
                sql += " AND dogs.name LIKE ?";
                params.push(`%${filters.dog}%`);
            }

            const rows = await con.query(sql, params);
            return rows[0];
        } catch (error) {
            console.log("Error fetching services:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
    createService: async (date, duration_m, location_id, dog_id) => {
            let con;
            try {
                con = await db.connectToDB()
                let sql =`
                INSERT INTO
                services
                (date, duration_m, location_id, dog_id)
                VALUES
                (?, ?, ?, ?)`
                const [result] = await con.query(sql, [date, duration_m, location_id, dog_id]);
                return {id: result.insertId, date, duration_m, location_id, dog_id}
            } catch (error) {
                console.log("Error creating service:", error);
                throw error;
            } finally {
                await db.disconnectToDB(con);
            }
        },
    updateService: async (id, {date, duration_m, location_id, dog_id}) => {
            let con
            try{
                console.log("model.params", id, date, duration_m, location_id, dog_id) //success
                con = await db.connectToDB();
                let sql=`
                UPDATE
                services
                SET
                date = ?,
                duration_m = ?,
                location_id = ?,
                dog_id = ?
                WHERE id = ?
                `
                const [result] = await con.query(sql, [date, duration_m, location_id, dog_id, id]);
                console.log("model.res", result) //success
                return {affectedRows: result.affectedRows, id, date, duration_m, location_id, dog_id};
            } catch (error) {
                console.log("Error updating service:", error);
                throw error;
            } finally {
               await db.disconnectToDB(con);
            }
        }
}
export default serviceModel;
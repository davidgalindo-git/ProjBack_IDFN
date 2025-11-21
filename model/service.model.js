import { db } from '../db/db.js'

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

            if (filters.duration){
                sql += " AND duration = ?";
                params.push(filters.duration);
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
            console.log("Error fetching contacts:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
}

export default serviceModel;
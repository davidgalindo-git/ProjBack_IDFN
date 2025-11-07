import mysql from 'mysql2/promise';

const db = {
    connectToDB: async () => {
        let con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABSE
        })
        return con;
    },

    disconnectToDB: async (con) => {
        try {
            await con.end();
            console.log("Disconnected from database");
        } catch (error) {
            console.error("Error disconnecting from database:", error);
        }
    },

    selectAllContacts: async () => {
        let con;
        try {
            con = await db.connectToDB()
            const rows = await con.query('SELECT * FROM contacts');
            return rows[0];
        } catch (error) {
            console.log("Error fetching contacts:", error);
            throw error;
        } finally {
            await db.disconnectToDB(con);
        }
    },
}

export { db }
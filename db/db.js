/**
 * File: db.js
 * Description: Database configuration and connection management utility using MySQL.
 * Date: 09/01/2026
 * Authors: Fabian Rostello, David Galindo, Imad El Khattabi, Nathan Filipowitz
 */
import mysql from 'mysql2/promise';

const db = {
    connectToDB: async () => {
        let con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.PSEUDO,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        console.log("Succesfully connected to database");
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
}

export { db }
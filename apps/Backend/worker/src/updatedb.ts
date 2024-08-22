// @ts-nocheck

const { Pool } = require('pg'); 


export async function updateDatabase({ dbUrl, dbName, username, password, query, values }) {
    const pool = new Pool({
        connectionString: `postgres://${username}:${password}@${dbUrl}/${dbName}`
    });

    let result;
    let client;

    try {
        client = await pool.connect();
        result = await client.query(query, values);
        
        return result.rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw new Error('Query execution failed');
    } finally {
        if (client) {
            client.release(); 
        }
    }
}


export async function addUser(user, dbConfig) {
    const query = `
        INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3)
        RETURNING *;
    `;
   
    try {
        const result = await updateDatabase({
            dbUrl: dbConfig.dbUrl,
            dbName: dbConfig.dbName,
            username: dbConfig.username,
            password: dbConfig.password,
            query: query,
            values: values
        });

        return result[0];
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user to the database');
    }
}

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


export async function testConnection({  }) {
    // Configure PostgreSQL connection pool
    const pool = new Pool({
        connectionString: `postgres://root:root@localhost:5432/turborepo`
    });

    let client;

    try {
        // Attempt to connect to the database
        client = await pool.connect();
        
        // If successful, return a success message
        return 'Database connection successful!';
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw new Error('Database connection failed');
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
        }
    }
}



export async function addUser(user, dbConfig) {
    const query = `
        INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3)
        RETURNING *;
    `;

    // Values to be inserted
    const values = [user.name, user.email, user.password];
    console.log(values);

    try {
        // Call the updateDatabase function with the proper parameters
        const result = await updateDatabase({
            dbUrl: dbConfig.dbUrl,
            dbName: dbConfig.dbName,
            username: dbConfig.username,
            password: dbConfig.password,
            query: query,
            values: values
        });

        // Return the newly created user
        return result[0];
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user to the database');
    }
}

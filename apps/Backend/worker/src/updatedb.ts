// @ts-nocheck

const { Pool } = require('pg'); // Import PostgreSQL client

export async function updateDatabase({  query, values }) {
    // Configure PostgreSQL connection pool
    const pool = new Pool({
        connectionString: `postgres://root:root@localhost:5432/turborepo`
    });

    let result;
    let client;

    try {
        // Connect to the database
        client = await pool.connect();
        
        // Execute the query
        result = await client.query(query, values);
        
        // Return the result
        return result.rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw new Error('Query execution failed');
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
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


export async function addUser(user) {
    const query = `
       INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3)
        RETURNING *;
    `;

    // Values to be inserted
    const values = [user.name,user.email,user.password];
    console.log(values)

    try {
        // Call the updateDatabase function to execute the query
        const result = await updateDatabase({  query, values });

        // Return the newly created user
        return result[0];
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user to the database');
    }
}

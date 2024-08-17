const { Pool } = require('pg'); // Import PostgreSQL client

// Function to update the database
async function updateDatabase({ dbUrl, username, password, dbName, query, values }) {
    // Configure PostgreSQL connection pool
    const pool = new Pool({
        connectionString: `postgres://${username}:${password}@${dbUrl}/${dbName}`
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

module.exports = { updateDatabase };

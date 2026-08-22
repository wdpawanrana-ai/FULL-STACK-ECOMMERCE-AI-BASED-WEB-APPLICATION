import pkg from "pg";
import { config } from "dotenv";
const { Client } = pkg;

config({ path: "./backend/config/config.env" });

const database = new Client({
    host: "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "egp_store",
    port: process.env.DB_PORT || 5432,
});

async function seedProduct() {
    try {
        await database.connect();

        // Use a valid user ID if possible, or create one
        const userRes = await database.query("SELECT id FROM users LIMIT 1");
        let userId;
        if (userRes.rows.length === 0) {
            console.log("No users found, creating a dummy user...");
            const newUser = await database.query(
                "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id",
                ["Dummy Admin", "admin@dummy.com", "password", "Admin"]
            );
            userId = newUser.rows[0].id;
        } else {
            userId = userRes.rows[0].id;
        }

        const productQuery = `
            INSERT INTO products (name, description, price, category, stock, created_by)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const productValues = [
            "Test Product",
            "This is a test description",
            10.5,
            "Accessories",
            100,
            userId
        ];

        const result = await database.query(productQuery, productValues);
        console.log("Product seeded:");
        console.table(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await database.end();
    }
}

seedProduct();

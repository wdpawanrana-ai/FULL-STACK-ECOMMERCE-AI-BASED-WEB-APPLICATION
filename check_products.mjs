import pkg from "pg";
import { config } from "dotenv";
const { Client } = pkg;

config({ path: "./backend/config/config.env" });

const database = new Client({
    host: "localhost", // Use localhost since I'm running outside docker for a moment
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "egp_store",
    port: process.env.DB_PORT || 5432,
});

async function checkProducts() {
    try {
        await database.connect();
        const result = await database.query("SELECT id, name, category, price, stock FROM products");
        console.log("Products in DB:");
        console.table(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await database.end();
    }
}

checkProducts();

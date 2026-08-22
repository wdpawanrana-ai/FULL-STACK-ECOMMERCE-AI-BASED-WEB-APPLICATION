import database from "./backend/database/db.js";

async function checkProducts() {
    try {
        const result = await database.query("SELECT id, name, category, price, stock FROM products");
        console.log("Products in DB:");
        console.table(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

checkProducts();

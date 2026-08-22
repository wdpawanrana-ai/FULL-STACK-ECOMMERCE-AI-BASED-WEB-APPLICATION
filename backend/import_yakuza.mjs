import pkg from "pg";
import { config } from "dotenv";
const { Client } = pkg;

config({ path: "./config/config.env" });

const database = new Client({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "egp_store",
    port: process.env.DB_PORT || 5432,
});

const yakuzaProducts = [
    { name: "Yakuza Duster", desc: "Budget-friendly family electric scooter. No driving licence required.", price: 35840 },
    { name: "Yakuza Ruster", desc: "Licence-free family electric scooter with durable build.", price: 37520 },
    { name: "Yakuza Ruble", desc: "Family oriented EV, affordable and highly sustainable.", price: 38080 },
    { name: "Yakuza Dragger", desc: "Electric scooter built for daily business commutes.", price: 38640 },
    { name: "Yakuza Neu", desc: "Smart compact business-class electric scooter.", price: 39760 },
    { name: "Yakuza Ramie", desc: "High-comfort business scooter for optimized deliveries.", price: 40880 },
    { name: "Yakuza Viraj", desc: "Premium business electric scooter with high efficiency.", price: 41440 },
    { name: "Yakuza Zunaid", desc: "Heavy-duty electric scooter suitable for business needs.", price: 42550 },
    { name: "Yakuza Cherry", desc: "Compact and stylish family scooter.", price: 44275 },
    { name: "Yakuza ADAA", desc: "A sleek sports electric scooter focused on performance.", price: 44800 },
    { name: "Yakuza Raavta", desc: "Sports electric scooter designed for speed and agility.", price: 51750 },
    { name: "Yakuza ASVA", desc: "High-performance sports e-scooter with retina-ready graphics.", price: 57000 },
    { name: "Yakuza Sparrow Plus", desc: "Premium sports electric scooter for long-range trips.", price: 57000 },
    { name: "Yakuza Rush", desc: "High-speed sports electric scooter with maximum control.", price: 57600 },
    { name: "Yakuza Y2", desc: "Next-gen sports EV performance machine.", price: 59400 },
    { name: "Yakuza Lucka", desc: "Top-tier electric sports scooter built for the future.", price: 61800 }
];

async function seedYakuza() {
    try {
        await database.connect();

        const userRes = await database.query("SELECT id FROM users WHERE role = 'Admin' LIMIT 1;");
        let adminId = null;
        if (userRes.rows.length > 0) {
            adminId = userRes.rows[0].id;
        }

        console.log(`Found Admin ID: ${adminId}`);
        console.log("Inserting Yakuza Electric Scooters...");

        for (const p of yakuzaProducts) {
            const images = JSON.stringify([{
                url: `https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&q=80`, // Generic EV photo placeholder
                public_id: `img_${Math.random().toString(36).substr(2, 9)}`
            }]);

            const query = `
                INSERT INTO products (name, description, price, category, stock, images, created_by)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;
            const values = [
                p.name,
                p.desc,
                p.price, // the price / 283 conversion in the other file seems like USD conversion. Let's just insert native INR, or convert if required. We'll insert native price, or map to what the app expects.
                "Electric Scooters",
                20, // default stock
                images,
                adminId
            ];
            await database.query(query, values);
            console.log(`Inserted: ${p.name}`);
        }

        console.log("Successfully seeded 16 Yakuza Products!");
    } catch (err) {
        console.error("Error during insertion:", err);
    } finally {
        await database.end();
    }
}

seedYakuza();
